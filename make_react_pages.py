from pathlib import Path
from bs4 import BeautifulSoup, NavigableString, Comment
import re
import json

ROOT = Path("/home/claude")
FRONTEND = ROOT / "frontend"
REACT = ROOT / "react-frontend"
PAGES = REACT / "src" / "pages"
PAGES.mkdir(parents=True, exist_ok=True)

PAGE_NAMES = {
    "index.html": "Home",
    "courses.html": "Courses",
    "course.html": "CourseDetails",
    "student-login.html": "StudentLogin",
    "student-register.html": "StudentRegister",
    "admin-login.html": "AdminLogin",
    "admin-schema-login.html": "AdminSchemaLogin",
    "student-dashboard.html": "StudentDashboard",
    "admin-dashboard.html": "AdminDashboard",
    "edit-course.html": "EditCourse",
    "forgot-password.html": "ForgotPassword",
    "reset-password.html": "ResetPassword",
    "login-selection.html": "LoginSelection",
    "notifications.html": "Notifications",
    "stu-login-enroll.html": "StudentEnroll",
}

ROUTES = {
    "index.html": "/",
    "courses.html": "/courses",
    "course.html": "/course",
    "student-login.html": "/student-login",
    "student-register.html": "/student-register",
    "admin-login.html": "/admin-login",
    "admin-schema-login.html": "/admin-schema-login",
    "student-dashboard.html": "/student-dashboard",
    "admin-dashboard.html": "/admin-dashboard",
    "edit-course.html": "/edit-course",
    "forgot-password.html": "/forgot-password",
    "reset-password.html": "/reset-password",
    "login-selection.html": "/login-selection",
    "notifications.html": "/notifications",
    "stu-login-enroll.html": "/stu-login-enroll",
}

# EduTrack.currentPage (app.js) is derived from the last segment of
# window.location.pathname with ".html" stripped. Scripts per page, in the
# exact order the original <script> tags appeared.
MODULE_PAGES = {"student-login.html", "student-register.html", "reset-password.html"}
PAGE_JS = {
    "student-login.html": "/legacy/js/pages/student-login.js",
    "student-register.html": "/legacy/js/pages/student-register.js",
    "reset-password.html": "/legacy/js/pages/reset-password.js",
}
SHARED_MODULES = [
    "/legacy/js/api.js",
    "/legacy/js/state.js",
    "/legacy/js/validation.js",
    "/legacy/js/ui.js",
    "/legacy/js/auth.js",
]
EXTRA_EXTERNAL = {
    "course.html": ["https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"],
}

VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input",
    "link", "meta", "param", "source", "track", "wbr",
}
ATTRIBUTE_MAP = {
    "class": "className",
    "for": "htmlFor",
    "tabindex": "tabIndex",
    "readonly": "readOnly",
    "maxlength": "maxLength",
    "minlength": "minLength",
    "autocomplete": "autoComplete",
    "colspan": "colSpan",
    "rowspan": "rowSpan",
    "crossorigin": "crossOrigin",
    "srcset": "srcSet",
    "autoplay": "autoPlay",
    "novalidate": "noValidate",
}
BOOLEAN_ATTRS = {"required", "disabled", "checked", "selected", "multiple", "readonly", "autofocus"}
# html.parser lowercases attribute names; these SVG attrs are camelCase-only
# in the DOM (no valid hyphenated form), so restore the correct casing.
SVG_ATTR_FIX = {
    "viewbox": "viewBox",
    "preserveaspectratio": "preserveAspectRatio",
    "gradientunits": "gradientUnits",
    "gradienttransform": "gradientTransform",
    "patternunits": "patternUnits",
    "patterncontentunits": "patternContentUnits",
    "patterntransform": "patternTransform",
    "spreadmethod": "spreadMethod",
    "clippath": "clipPath",
    "cliprule": "clipRule",
    "fillrule": "fillRule",
    "fillopacity": "fillOpacity",
    "strokeopacity": "strokeOpacity",
    "strokedasharray": "strokeDasharray",
    "strokedashoffset": "strokeDashoffset",
    "strokemiterlimit": "strokeMiterlimit",
    "textanchor": "textAnchor",
    "dominantbaseline": "dominantBaseline",
    "xlink:href": "xlinkHref",
}
ATTRIBUTE_MAP.update(SVG_ATTR_FIX)


def quote(value):
    return json.dumps(str(value), ensure_ascii=False)


def convert_style(value):
    if not isinstance(value, str):
        return "{}"
    props = {}
    order = []
    for item in value.split(";"):
        if ":" not in item:
            continue
        key, val = item.split(":", 1)
        key = key.strip()
        val = val.strip()
        if not key:
            continue
        key = re.sub(r"-([a-zA-Z])", lambda m: m.group(1).upper(), key)
        if key not in props:
            order.append(key)
        props[key] = val  # last declaration wins, same as real CSS
    return "{" + ", ".join(f"{k}: {quote(props[k])}" for k in order) + "}"


def convert_text(value):
    value = str(value)
    value = value.replace("{", "&#123;").replace("}", "&#125;")
    return value.strip()


def convert_attributes(tag):
    attributes = []
    for key, value in tag.attrs.items():
        if key == "style":
            attributes.append(f"style={{{convert_style(value)}}}")
            continue
        new_key = ATTRIBUTE_MAP.get(key, key)
        if isinstance(value, list):
            value = " ".join(value)
        if key.lower() in BOOLEAN_ATTRS:
            attributes.append(new_key)
            continue
        if value is None:
            attributes.append(new_key)
            continue
        attributes.append(f"{new_key}={quote(value)}")
    if not attributes:
        return ""
    return " " + " ".join(attributes)


def convert_node(node, level, routes):
    indent = "    " * level
    if isinstance(node, Comment):
        text = str(node).strip()
        if not text:
            return ""
        return indent + "{/* " + text.replace("*/", "* /") + " */}"
    if isinstance(node, NavigableString):
        text_value = convert_text(node)
        if not text_value:
            return ""
        return indent + text_value
    if not getattr(node, "name", None):
        return ""
    if node.name in ("script", "style"):
        return ""

    if node.name == "a":
        href = node.get("href")
        route = routes.get(href)
        if route:
            attrs = []
            for key, value in node.attrs.items():
                if key == "href":
                    continue
                if key == "style":
                    attrs.append(f"style={{{convert_style(value)}}}")
                    continue
                new_key = ATTRIBUTE_MAP.get(key, key)
                if isinstance(value, list):
                    value = " ".join(value)
                if key.lower() in BOOLEAN_ATTRS:
                    attrs.append(new_key)
                    continue
                if value is None:
                    attrs.append(new_key)
                    continue
                attrs.append(f"{new_key}={quote(value)}")
            attribute_text = (" " + " ".join(attrs)) if attrs else ""
            children = []
            for child in node.children:
                converted = convert_node(child, level + 1, routes)
                if converted:
                    children.append(converted)
            if not children:
                return indent + f'<Link to={quote(route)}{attribute_text}></Link>'
            return (
                indent + f'<Link to={quote(route)}{attribute_text}>' + "\n"
                + "\n".join(children) + "\n" + indent + "</Link>"
            )

    tag_name = node.name
    attribute_text = convert_attributes(node)
    if tag_name in VOID_TAGS:
        return indent + f"<{tag_name}{attribute_text} />"

    children = []
    for child in node.children:
        converted = convert_node(child, level + 1, routes)
        if converted:
            children.append(converted)

    if not children:
        return indent + f"<{tag_name}{attribute_text}></{tag_name}>"

    if len(children) == 1 and not children[0].lstrip().startswith("<") and "\n" not in children[0]:
        return indent + f"<{tag_name}{attribute_text}>" + children[0].lstrip() + f"</{tag_name}>"

    return (
        indent + f"<{tag_name}{attribute_text}>" + "\n"
        + "\n".join(children) + "\n" + indent + f"</{tag_name}>"
    )


for html_file in sorted(FRONTEND.glob("*.html")):
    page_name = html_file.name
    component_name = PAGE_NAMES.get(page_name)
    if not component_name:
        continue

    html = html_file.read_text(encoding="utf-8")
    soup = BeautifulSoup(html, "html.parser")
    body = soup.body
    if body is None:
        continue

    content = []
    for child in body.children:
        converted = convert_node(child, 3, ROUTES)
        if converted:
            content.append(converted)
    content_text = "\n".join(content)

    imports = [
        'import PageCss from "../components/PageCss";',
        'import LegacyScript from "../components/LegacyScript";',
    ]
    if "<Link " in content_text:
        imports.insert(0, 'import { Link } from "react-router-dom";')

    # Build the ordered legacy script list for this page.
    scripts = list(EXTRA_EXTERNAL.get(page_name, []))
    if page_name in MODULE_PAGES:
        scripts += SHARED_MODULES + [PAGE_JS[page_name]]
    else:
        scripts += ["/legacy/js/app.js"]
    scripts_prop = "[" + ", ".join(quote(s) for s in scripts) + "]"

    component_code = (
        "\n".join(imports)
        + "\n\n"
        + f"export default function {component_name}() {{\n"
        + "    return (\n"
        + "        <>\n"
        + '            <PageCss href="/css/app.css" />\n'
        + content_text + "\n"
        + f"            <LegacyScript srcs={{{scripts_prop}}} />\n"
        + "        </>\n"
        + "    );\n"
        + "}\n"
    )

    output_file = PAGES / f"{component_name}.jsx"
    output_file.write_text(component_code, encoding="utf-8")
    print("Created:", output_file)

print()
print("React page conversion completed.")
