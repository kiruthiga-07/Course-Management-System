/* ==========================================================================
   EduTrack — Consolidated Application Script (app.js)
   Combines: courses-data.js, enrollments-data.js, course-content-data.js,
   and every page-specific inline <script> block from every page.

   Page-specific code only runs on its matching page: the page is identified
   by the current HTML filename and dispatched automatically at the bottom
   of this file, so a single <script src="app.js"></script> tag works for
   every page in the project.
   ========================================================================== */

/* ============================== courses-data.js ============================== */
/* ==========================================================================
   EduTrack — Shared Course Data Store
   Backed by localStorage so admin edits (edit-course.html) are reflected
   immediately on the public courses page (courses.html).
   ========================================================================== */
(function (window) {
    var STORAGE_KEY = 'edutrack_courses';

    var FIELDS = [
        { id: 'ai', label: 'Artificial Intelligence', subtitle: 'Design intelligent systems that reason, learn, and adapt.' },
        { id: 'ml', label: 'Machine Learning', subtitle: 'Turn data into predictions with statistical and algorithmic models.' },
        { id: 'data-science', label: 'Data Science', subtitle: 'Extract insights from raw data using statistics and visualization.' },
        { id: 'cyber-security', label: 'Cyber Security', subtitle: 'Defend systems, networks, and data against modern threats.' },
        { id: 'web-dev', label: 'Web Development', subtitle: 'Build modern, responsive web applications end to end.' },
        { id: 'cloud', label: 'Cloud Computing', subtitle: 'Design, deploy, and scale infrastructure on modern cloud platforms.' }
    ];

    var BADGES = ['Beginner', 'Intermediate', 'Advanced'];
    var MODES = ['Online / Self-paced', 'Hybrid', 'Online', 'On-campus'];
    var CERTIFICATES = ['Yes', 'No'];

    var DEFAULT_COURSES = [
        // ---- Artificial Intelligence ----
        { id: 'ai-1', field: 'ai', title: 'AI Fundamentals', badge: 'Beginner', duration: '10 Weeks', description: 'An introduction to core AI concepts, search algorithms, and knowledge representation.', instructor: 'Dr. R. Menon', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'ai-2', field: 'ai', title: 'Neural Networks & Deep Learning', badge: 'Intermediate', duration: '14 Weeks', description: 'Build and train neural networks using modern deep learning frameworks.', instructor: 'Prof. A. Sharma', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'ai-3', field: 'ai', title: 'Natural Language Processing', badge: 'Advanced', duration: '16 Weeks', description: 'Work with transformers, embeddings, and large language models for text tasks.', instructor: 'Dr. S. Iyer', mode: 'Online', certificate: 'Yes' },
        { id: 'ai-4', field: 'ai', title: 'Computer Vision', badge: 'Advanced', duration: '12 Weeks', description: 'Learn image classification, object detection, and vision-based automation.', instructor: 'Prof. K. Reddy', mode: 'On-campus', certificate: 'Yes' },

        // ---- Machine Learning ----
        { id: 'ml-1', field: 'ml', title: 'ML Foundations', badge: 'Beginner', duration: '8 Weeks', description: 'Supervised and unsupervised learning fundamentals using Python and scikit-learn.', instructor: 'Dr. N. Verma', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'ml-2', field: 'ml', title: 'Applied Regression & Classification', badge: 'Intermediate', duration: '12 Weeks', description: 'Deep dive into model tuning, feature engineering, and evaluation metrics.', instructor: 'Prof. T. Nair', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'ml-3', field: 'ml', title: 'Reinforcement Learning', badge: 'Advanced', duration: '14 Weeks', description: 'Explore reward-driven agents, Markov decision processes, and policy optimization.', instructor: 'Dr. P. Bose', mode: 'Online', certificate: 'Yes' },
        { id: 'ml-4', field: 'ml', title: 'MLOps Essentials', badge: 'Intermediate', duration: '10 Weeks', description: 'Deploy, monitor, and maintain machine learning models in production environments.', instructor: 'Prof. D. Rao', mode: 'On-campus', certificate: 'Yes' },

        // ---- Data Science ----
        { id: 'data-science-1', field: 'data-science', title: 'Data Science Bootcamp', badge: 'Beginner', duration: '9 Weeks', description: 'Hands-on introduction to data wrangling, EDA, and storytelling with data.', instructor: 'Dr. M. Pillai', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'data-science-2', field: 'data-science', title: 'Statistical Analysis with Python', badge: 'Intermediate', duration: '12 Weeks', description: 'Apply hypothesis testing, regression analysis, and probability models to real datasets.', instructor: 'Prof. V. Krishnan', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'data-science-3', field: 'data-science', title: 'Big Data Analytics', badge: 'Advanced', duration: '15 Weeks', description: 'Process and analyze large-scale datasets using Spark and distributed pipelines.', instructor: 'Dr. H. Chatterjee', mode: 'Online', certificate: 'Yes' },
        { id: 'data-science-4', field: 'data-science', title: 'Data Visualization & BI', badge: 'Intermediate', duration: '10 Weeks', description: 'Build interactive dashboards using Tableau, Power BI, and visualization libraries.', instructor: 'Prof. L. Fernandes', mode: 'On-campus', certificate: 'Yes' },

        // ---- Cyber Security ----
        { id: 'cyber-security-1', field: 'cyber-security', title: 'Cyber Security Basics', badge: 'Beginner', duration: '8 Weeks', description: 'Understand core security principles, threat models, and safe computing practices.', instructor: 'Prof. A. Iyer', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'cyber-security-2', field: 'cyber-security', title: 'Network Defense & Cryptography', badge: 'Intermediate', duration: '12 Weeks', description: 'Learn firewalls, encryption protocols, and secure network architecture design.', instructor: 'Dr. G. Prasad', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'cyber-security-3', field: 'cyber-security', title: 'Ethical Hacking & Penetration Testing', badge: 'Advanced', duration: '14 Weeks', description: 'Practice offensive security techniques to identify and remediate vulnerabilities.', instructor: 'Prof. J. Thomas', mode: 'On-campus', certificate: 'Yes' },
        { id: 'cyber-security-4', field: 'cyber-security', title: 'Application Security', badge: 'Advanced', duration: '10 Weeks', description: 'Secure web and enterprise applications against OWASP top vulnerabilities.', instructor: 'Dr. R. Kapoor', mode: 'Online', certificate: 'Yes' },

        // ---- Web Development ----
        { id: 'web-dev-1', field: 'web-dev', title: 'HTML, CSS & JavaScript', badge: 'Beginner', duration: '6 Weeks', description: 'Build the foundation for modern web interfaces from the ground up.', instructor: 'Prof. S. Gupta', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'web-dev-2', field: 'web-dev', title: 'Full Stack Development', badge: 'Intermediate', duration: '12 Weeks', description: 'Combine React front ends with Node.js and database-driven back ends.', instructor: 'Dr. F. Alam', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'web-dev-3', field: 'web-dev', title: 'API Design & Microservices', badge: 'Advanced', duration: '10 Weeks', description: 'Architect scalable REST and GraphQL APIs for enterprise applications.', instructor: 'Prof. Y. Das', mode: 'Online', certificate: 'Yes' },
        { id: 'web-dev-4', field: 'web-dev', title: 'Responsive UI/UX Design', badge: 'Intermediate', duration: '8 Weeks', description: 'Design accessible, mobile-first interfaces with modern layout systems.', instructor: 'Dr. C. Mathew', mode: 'On-campus', certificate: 'Yes' },

        // ---- Cloud Computing ----
        { id: 'cloud-1', field: 'cloud', title: 'Cloud Computing Fundamentals', badge: 'Beginner', duration: '7 Weeks', description: 'Understand core concepts of AWS, Azure, and GCP cloud service models.', instructor: 'Prof. B. Joseph', mode: 'Online / Self-paced', certificate: 'Yes' },
        { id: 'cloud-2', field: 'cloud', title: 'DevOps & CI/CD Pipelines', badge: 'Intermediate', duration: '11 Weeks', description: 'Automate build, test, and deployment workflows using industry-standard tools.', instructor: 'Dr. N. Pandey', mode: 'Hybrid', certificate: 'Yes' },
        { id: 'cloud-3', field: 'cloud', title: 'Kubernetes & Container Orchestration', badge: 'Advanced', duration: '13 Weeks', description: 'Deploy and manage containerized applications at scale in production clusters.', instructor: 'Prof. E. George', mode: 'Online', certificate: 'Yes' },
        { id: 'cloud-4', field: 'cloud', title: 'Cloud Security & Compliance', badge: 'Intermediate', duration: '9 Weeks', description: 'Secure cloud workloads and meet regulatory compliance requirements.', instructor: 'Dr. W. Fernandez', mode: 'On-campus', certificate: 'Yes' }
    ];

    function fieldLabel(fieldId) {
        for (var i = 0; i < FIELDS.length; i++) {
            if (FIELDS[i].id === fieldId) return FIELDS[i].label;
        }
        return fieldId;
    }

    function loadCourses() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                var parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) return parsed;
            }
        } catch (e) {
            /* fall through to defaults */
        }
        var seed = DEFAULT_COURSES.slice();
        saveCourses(seed);
        return seed;
    }

    function saveCourses(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function generateId(fieldId) {
        return (fieldId || 'course') + '-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 1000);
    }

    function upsertCourse(course) {
        var list = loadCourses();
        if (course.id) {
            var idx = -1;
            for (var i = 0; i < list.length; i++) {
                if (list[i].id === course.id) { idx = i; break; }
            }
            if (idx !== -1) {
                list[idx] = course;
                saveCourses(list);
                return course;
            }
        }
        course.id = generateId(course.field);
        list.push(course);
        saveCourses(list);
        return course;
    }

    function deleteCourse(id) {
        var list = loadCourses().filter(function (c) { return c.id !== id; });
        saveCourses(list);
    }

    window.EduTrackData = {
        FIELDS: FIELDS,
        BADGES: BADGES,
        MODES: MODES,
        CERTIFICATES: CERTIFICATES,
        fieldLabel: fieldLabel,
        loadCourses: loadCourses,
        saveCourses: saveCourses, 
        upsertCourse: upsertCourse,
        deleteCourse: deleteCourse,
        generateId: generateId
    };
})(window);
/* ============================== enrollments-data.js ============================== */
/* ==========================================================================
   EduTrack — Shared Enrollments & Progress Data Store
   Backed by localStorage. Single source of truth used by:
     - stu-login-enroll.html   (creates enrollments)
     - student-dashboard.html  (lists a student's own enrollments/progress)
     - course.html             (tracks Photo/Video/Theory module progress)
     - admin-dashboard.html    (lists/edits/removes ALL enrollments + stats)
   ========================================================================== */
(function (window) {
    var STORAGE_KEY = 'edutrack_enrollments';
    var CURRENT_STUDENT_KEY = 'edutrack_current_student';

    function loadEnrollments() {
        try {
            var raw = localStorage.getItem(STORAGE_KEY);
            var parsed = raw ? JSON.parse(raw) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            return [];
        }
    }

    function saveEnrollments(list) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }

    function normRoll(roll) {
        return (roll || '').toString().trim().toLowerCase();
    }

    function generateId() {
        return 'enr-' + Date.now().toString(36) + '-' + Math.floor(Math.random() * 10000);
    }

    /* ---------------- Current student session ---------------- */

    function getCurrentStudent() {
        try {
            var raw = localStorage.getItem(CURRENT_STUDENT_KEY);
            return raw ? JSON.parse(raw) : null;
        } catch (e) {
            return null;
        }
    }

    function setCurrentStudent(student) {
        localStorage.setItem(CURRENT_STUDENT_KEY, JSON.stringify(student));
    }

    function clearCurrentStudent() {
        localStorage.removeItem(CURRENT_STUDENT_KEY);
    }

    /* ---------------- Enrollments (student-facing) ---------------- */

    function getStudentEnrollments(rollNo) {
        var roll = normRoll(rollNo);
        return loadEnrollments().filter(function (e) { return normRoll(e.rollNo) === roll; });
    }

    function getEnrollment(rollNo, courseId) {
        var roll = normRoll(rollNo);
        var list = loadEnrollments();
        for (var i = 0; i < list.length; i++) {
            if (normRoll(list[i].rollNo) === roll && list[i].courseId === courseId) return list[i];
        }
        return null;
    }

    function isEnrolled(rollNo, courseId) {
        return !!getEnrollment(rollNo, courseId);
    }

    function addEnrollment(data) {
        var list = loadEnrollments();
        var roll = normRoll(data.rollNo);

        for (var i = 0; i < list.length; i++) {
            if (normRoll(list[i].rollNo) === roll && list[i].courseId === data.courseId) {
                return list[i]; // already enrolled — don't create a duplicate row
            }
        }

        var record = {
            id: generateId(),
            studentName: data.studentName,
            rollNo: data.rollNo,
            courseId: data.courseId,
            courseTitle: data.courseTitle,
            field: data.field || '',
            status: 'pending',       // 'pending' | 'completed' — matches admin dashboard labels
            progress: 0,             // 0-100, driven by module completion
            moduleProgress: {},      // { [moduleId]: { photo, video, theory } }
            enrolledAt: Date.now(),
            completedAt: null
        };

        list.push(record);
        saveEnrollments(list);
        return record;
    }

    /* ---------------- Module-level progress (course.html) ---------------- */

    function getModuleProgress(rollNo, courseId, moduleId) {
        var enrollment = getEnrollment(rollNo, courseId);
        if (!enrollment || !enrollment.moduleProgress || !enrollment.moduleProgress[moduleId]) {
            return { photo: false, video: false, theory: false };
        }
        return enrollment.moduleProgress[moduleId];
    }

    function isModuleComplete(part) {
        return !!(part && part.photo && part.video && part.theory);
    }

    // Marks a single part (photo/video/theory) of a module as viewed and
    // recalculates overall course progress + status. This is what makes
    // the admin's "Pending"/"Completed" badge and progress bars update
    // automatically as a student works through a course.
    function markPartViewed(rollNo, courseId, moduleId, part, totalModules) {
        var list = loadEnrollments();
        var roll = normRoll(rollNo);
        var record = null;

        for (var i = 0; i < list.length; i++) {
            if (normRoll(list[i].rollNo) === roll && list[i].courseId === courseId) { record = list[i]; break; }
        }
        if (!record) return null;

        if (!record.moduleProgress) record.moduleProgress = {};
        if (!record.moduleProgress[moduleId]) {
            record.moduleProgress[moduleId] = { photo: false, video: false, theory: false };
        }
        record.moduleProgress[moduleId][part] = true;

        var completedModules = 0;
        var keys = Object.keys(record.moduleProgress);
        for (var j = 0; j < keys.length; j++) {
            if (isModuleComplete(record.moduleProgress[keys[j]])) completedModules++;
        }

        var total = totalModules || Math.max(keys.length, 1);
        record.progress = Math.min(100, Math.round((completedModules / total) * 100));

        if (record.progress >= 100 && record.status !== 'completed') {
            record.status = 'completed';
            record.completedAt = Date.now();
        } else if (record.progress < 100 && record.status === 'completed') {
            record.status = 'pending';
            record.completedAt = null;
        }

        saveEnrollments(list);
        return record;
    }

    /* ---------------- Admin dashboard API ---------------- */

    function setStatusById(id, status) {
        var list = loadEnrollments();
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === id) {
                list[i].status = status;
                if (status === 'completed') {
                    list[i].completedAt = Date.now();
                    list[i].progress = 100; // manual admin override marks it fully done
                } else {
                    list[i].completedAt = null;
                }
                saveEnrollments(list);
                return list[i];
            }
        }
        return null;
    }

    function removeById(id) {
        var list = loadEnrollments().filter(function (e) { return e.id !== id; });
        saveEnrollments(list);
    }

    function stats() {
        var list = loadEnrollments();
        var uniqueStudents = {};
        var totalCompleted = 0;

        list.forEach(function (e) {
            uniqueStudents[normRoll(e.rollNo)] = true;
            if (e.status === 'completed') totalCompleted++;
        });

        var totalEnrollments = list.length;
        return {
            totalStudents: Object.keys(uniqueStudents).length,
            totalEnrollments: totalEnrollments,
            totalCompleted: totalCompleted,
            totalPending: totalEnrollments - totalCompleted
        };
    }

    window.EduTrackEnrollments = {
        // session
        getCurrentStudent: getCurrentStudent,
        setCurrentStudent: setCurrentStudent,
        clearCurrentStudent: clearCurrentStudent,
        // student-facing
        loadEnrollments: loadEnrollments,
        getStudentEnrollments: getStudentEnrollments,
        getEnrollment: getEnrollment,
        isEnrolled: isEnrolled,
        addEnrollment: addEnrollment,
        getModuleProgress: getModuleProgress,
        isModuleComplete: isModuleComplete,
        markPartViewed: markPartViewed,
        // admin-facing
        setStatusById: setStatusById,
        removeById: removeById,
        stats: stats
    };

})(window);
/* ============================== course-content-data.js ============================== */
/* ==========================================================================
   EduTrack — Course Content Data Store
   Generates the Photo / Video / Theory learning modules shown on
   course.html for every course. Content differs per field (AI, ML,
   Data Science, Cyber Security, Web Dev, Cloud) and is further
   personalized using the specific course's title / instructor, so
   every course gets its own distinct module set.
   ========================================================================== */
(function (window) {

    // Field-specific module skeletons: 4 modules per field, each with a
    // title and a short "focus" phrase used to build the theory text.
    var FIELD_MODULES = {
        'ai': [
            { title: 'Foundations & Problem Framing', focus: 'how problems are framed as states, goals and search spaces in artificial intelligence' },
            { title: 'Knowledge Representation & Reasoning', focus: 'representing knowledge with logic, graphs and probability so a system can reason under uncertainty' },
            { title: 'Building & Training Intelligent Models', focus: 'the practical workflow of building, training and validating an AI model on real data' },
            { title: 'Deploying Real-World AI Applications', focus: 'taking a trained model into a real application, monitoring it, and iterating from feedback' }
        ],
        'ml': [
            { title: 'What Machine Learning Really Is', focus: 'the difference between traditional programming and learning patterns directly from data' },
            { title: 'The Supervised Learning Workflow', focus: 'splitting data, training a model, and validating it using a repeatable supervised learning workflow' },
            { title: 'Feature Engineering & Model Evaluation', focus: 'shaping raw features and choosing the right metrics to evaluate a model honestly' },
            { title: 'From Model to Real Application', focus: 'packaging a trained model and wiring it into a working, real-world application' }
        ],
        'data-science': [
            { title: 'Understanding Data & Its Sources', focus: 'where data comes from, common data quality issues, and how to clean it responsibly' },
            { title: 'Exploratory Data Analysis Workflow', focus: 'exploring a dataset visually and statistically to uncover patterns before modeling' },
            { title: 'Statistical Modeling & Insights', focus: 'applying statistical techniques to turn raw numbers into defensible insights' },
            { title: 'Communicating Data Stories', focus: 'presenting findings through dashboards and narratives that non-technical stakeholders can act on' }
        ],
        'cyber-security': [
            { title: 'Understanding the Threat Landscape', focus: 'the common categories of cyber threats and how attackers typically operate' },
            { title: 'Defensive Security Techniques', focus: 'core defensive controls such as firewalls, encryption and access management' },
            { title: 'Hands-on Vulnerability Assessment', focus: 'identifying and prioritizing vulnerabilities in a system before they are exploited' },
            { title: 'Incident Response & Real-World Defense', focus: 'responding to a live security incident and hardening a system against repeat attacks' }
        ],
        'web-dev': [
            { title: 'Structuring the Web with HTML & CSS', focus: 'structuring content and styling it into a clean, responsive page layout' },
            { title: 'Adding Interactivity with JavaScript', focus: 'using JavaScript to make a page respond to user actions in real time' },
            { title: 'Building Full Stack Features', focus: 'connecting a front end to a back end and a database to ship a real feature' },
            { title: 'Deploying a Real Application', focus: 'taking a finished web application from local development to a live deployment' }
        ],
        'cloud': [
            { title: 'Cloud Computing Core Concepts', focus: 'the core service models and building blocks that make up modern cloud platforms' },
            { title: 'Provisioning & Managing Infrastructure', focus: 'provisioning compute, storage and networking resources in a reliable, repeatable way' },
            { title: 'Automating Deployments', focus: 'automating build and deployment pipelines so releases are fast and consistent' },
            { title: 'Scaling & Securing in Production', focus: 'scaling a workload under real traffic while keeping it secure and compliant' }
        ]
    };

    // A small rotating set of illustrative emoji/gradients so each course's
    // photo module looks a little different from its neighbours.
    var VISUAL_THEMES = [
        { emoji: '🚀', from: '#6a1b4d', to: '#3a0d2b' },
        { emoji: '🧠', from: '#1b3a6a', to: '#0d1e3a' },
        { emoji: '📊', from: '#1b6a4d', to: '#0d3a2b' },
        { emoji: '🛡️', from: '#6a4d1b', to: '#3a2b0d' },
        { emoji: '🌐', from: '#4d1b6a', to: '#2b0d3a' },
        { emoji: '☁️', from: '#1b5a6a', to: '#0d323a' }
    ];

    function themeForCourse(course) {
        var idx = 0;
        var str = course.id || course.title || '';
        for (var i = 0; i < str.length; i++) idx += str.charCodeAt(i);
        return VISUAL_THEMES[idx % VISUAL_THEMES.length];
    }

    function theoryParagraph(course, moduleInfo, moduleIndex) {
        return 'This section of ' + course.title + ' focuses on ' + moduleInfo.focus + '. ' +
            'Guided by ' + (course.instructor || 'your instructor') + ', you will work through the ' +
            'underlying concepts step by step before connecting them back to practical, job-ready skills. ' +
            'Read through the material carefully — scroll all the way to the end of this panel to mark the ' +
            'theory portion of Module ' + (moduleIndex + 1) + ' as complete. ' +
            'By the end of this module you should be able to explain the core idea in your own words, ' +
            'recognise it in a real project, and know the most common pitfalls learners run into at this stage of ' +
            fieldLabelSafe(course.field) + '. Take your time — there is no rush, and you can always revisit this ' +
            'panel later from your dashboard.';
    }

    function fieldLabelSafe(fieldId) {
        if (window.EduTrackData && window.EduTrackData.fieldLabel) return window.EduTrackData.fieldLabel(fieldId);
        return fieldId;
    }

    // Merges an admin-authored custom module (from course.modules, edited on
    // edit-course.html) on top of an auto-generated module. Any field the
    // admin left blank falls back to the auto-generated value, so courses
    // always have sensible content even if only partially customised.
    function mergeModule(autoModule, custom) {
        var hasCustomPhotoUrl = custom && custom.photoUrl && custom.photoUrl.trim();
        var hasCustomVideoUrl = custom && custom.videoUrl && custom.videoUrl.trim();
        return {
            id: autoModule.id,
            index: autoModule.index,
            title: (custom && custom.title && custom.title.trim()) ? 'Module ' + (autoModule.index + 1) + ': ' + custom.title.trim() : autoModule.title,
            shortTitle: (custom && custom.title && custom.title.trim()) ? custom.title.trim() : autoModule.shortTitle,
            photo: {
                caption: (custom && custom.photoCaption && custom.photoCaption.trim()) ? custom.photoCaption.trim() : autoModule.photo.caption,
                emoji: autoModule.photo.emoji,
                colorFrom: autoModule.photo.colorFrom,
                colorTo: autoModule.photo.colorTo,
                imageUrl: hasCustomPhotoUrl ? custom.photoUrl.trim() : ''
            },
            video: {
                caption: (custom && custom.videoCaption && custom.videoCaption.trim()) ? custom.videoCaption.trim() : autoModule.video.caption,
                duration: (custom && custom.videoDuration && custom.videoDuration.trim()) ? custom.videoDuration.trim() : autoModule.video.duration,
                url: hasCustomVideoUrl ? custom.videoUrl.trim() : ''
            },
            theory: {
                text: (custom && custom.theoryText && custom.theoryText.trim()) ? custom.theoryText.trim() : autoModule.theory.text
            }
        };
    }

    function autoModuleAt(course, theme, skeleton, i) {
        var skel = skeleton[i % skeleton.length];
        return {
            id: course.id + '-m' + (i + 1),
            index: i,
            title: 'Module ' + (i + 1) + ': ' + skel.title,
            shortTitle: skel.title,
            photo: {
                caption: 'Visual overview — ' + skel.title,
                emoji: theme.emoji,
                colorFrom: theme.from,
                colorTo: theme.to
            },
            video: {
                caption: 'Video walkthrough — ' + skel.title,
                duration: (3 + i * 2) + ' min'
            },
            theory: {
                text: theoryParagraph(course, skel, i)
            }
        };
    }

    // Returns the auto-generated module skeleton for a course, in the plain
    // "custom module" shape used by course.modules / the edit-course.html
    // module editor. Handy for seeding the admin form with sensible starting
    // content that they can then tweak.
    function getDefaultCustomModules(course) {
        var skeleton = FIELD_MODULES[course.field] || FIELD_MODULES['web-dev'];
        var theme = themeForCourse(course);
        return skeleton.map(function (_, i) {
            var auto = autoModuleAt(course, theme, skeleton, i);
            return {
                title: auto.shortTitle,
                photoCaption: auto.photo.caption,
                photoUrl: '',
                videoCaption: auto.video.caption,
                videoDuration: auto.video.duration,
                videoUrl: '',
                theoryText: auto.theory.text
            };
        });
    }

    function getModules(course) {
        var skeleton = FIELD_MODULES[course.field] || FIELD_MODULES['web-dev'];
        var theme = themeForCourse(course);
        var customModules = (course.modules && course.modules.length) ? course.modules : null;
        var count = customModules ? customModules.length : skeleton.length;

        var result = [];
        for (var i = 0; i < count; i++) {
            var auto = autoModuleAt(course, theme, skeleton, i);
            var custom = customModules ? customModules[i] : null;
            result.push(mergeModule(auto, custom));
        }
        return result;
    }

    window.EduTrackCourseContent = {
        getModules: getModules,
        getDefaultCustomModules: getDefaultCustomModules
    };

})(window);
/* ============================== Page dispatch ============================== */
window.EduTrack = window.EduTrack || {};
EduTrack.pages = {};

// Identify the current page from the URL so the right page-specific code
// (and only that code) runs, regardless of which HTML file loaded app.js.
EduTrack.currentPage = (function () {
    var path = window.location.pathname;
    var file = path.substring(path.lastIndexOf('/') + 1) || 'index.html';
    return file.replace(/\.html$/i, '') || 'index';
})();

/* ============================== edit-course.html admin gate ==============================
   This must run immediately (synchronously, before the page body renders) —
   exactly like the original inline <script> at the top of edit-course.html —
   so an unauthenticated visitor is redirected before any admin content is
   ever drawn on screen. It is intentionally NOT deferred to DOMContentLoaded. */
if (EduTrack.currentPage === 'edit-course') {
// Gate this page behind the admin login. Runs before the body renders.
        if (localStorage.getItem('isAdminVerified') !== 'true') {
            window.location.replace('admin-schema-login.html');
        }
}

/* ---------- admin-dashboard ---------- */
EduTrack.pages['admin-dashboard'] = function () {
(function () {
            var CD = window.EduTrackData;
            var E = window.EduTrackEnrollments;

            function escapeHtml(str) {
                var div = document.createElement('div');
                div.textContent = str == null ? '' : String(str);
                return div.innerHTML;
            }

            function emptyState(message) {
                return '<div class="dashboard-empty">' +
                    '<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>' +
                    '<p>' + message + '</p>' +
                '</div>';
            }

            /* ---------------- Curriculum Management ---------------- */
            function renderCurriculum() {
                var courses = CD.loadCourses();
                document.getElementById('statCourses').textContent = courses.length;
                document.getElementById('countCourses').textContent = courses.length + ' course' + (courses.length === 1 ? '' : 's');
                var body = document.getElementById('curriculumPanelBody');

                if (!courses.length) {
                    body.innerHTML = emptyState('No courses have been added yet. Newly created courses will appear here.');
                    return;
                }

                var rows = courses.map(function (c) {
                    return '<tr>' +
                        '<td><strong>' + escapeHtml(c.title) + '</strong></td>' +
                        '<td>' + escapeHtml(CD.fieldLabel(c.field)) + '</td>' +
                        '<td>' + escapeHtml(c.badge) + '</td>' +
                        '<td>' + escapeHtml(c.duration) + '</td>' +
                        '<td>' + escapeHtml(c.instructor) + '</td>' +
                        '<td class="table-actions">' +
                            '<button class="btn btn-outline btn-tiny edit-course-btn" data-id="' + escapeHtml(c.id) + '">Edit</button>' +
                            '<button class="btn btn-danger btn-tiny delete-course-btn" data-id="' + escapeHtml(c.id) + '">Delete</button>' +
                        '</td>' +
                    '</tr>';
                }).join('');

                body.innerHTML = '<div class="dash-table-wrap"><table class="dash-table">' +
                    '<thead><tr><th>Course</th><th>Field</th><th>Level</th><th>Duration</th><th>Instructor</th><th>Actions</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table></div>';

                body.querySelectorAll('.edit-course-btn').forEach(function (btn) {
                    btn.addEventListener('click', function () { openCourseForm(btn.getAttribute('data-id')); });
                });
                body.querySelectorAll('.delete-course-btn').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var id = btn.getAttribute('data-id');
                        if (confirm('Delete this course? This cannot be undone.')) {
                            CD.deleteCourse(id);
                            renderAll();
                        }
                    });
                });
            }

            /* ---------------- Add / Edit Course Modal ---------------- */
            function populateSelect(selectEl, options) {
                selectEl.innerHTML = options.map(function (opt) {
                    return '<option value="' + escapeHtml(opt) + '">' + escapeHtml(opt) + '</option>';
                }).join('');
            }

            function populateFieldSelect() {
                var sel = document.getElementById('courseFormField');
                sel.innerHTML = CD.FIELDS.map(function (f) {
                    return '<option value="' + f.id + '">' + escapeHtml(f.label) + '</option>';
                }).join('');
            }

            function openCourseForm(courseId) {
                populateFieldSelect();
                populateSelect(document.getElementById('courseFormBadge'), CD.BADGES);
                populateSelect(document.getElementById('courseFormMode'), CD.MODES);
                populateSelect(document.getElementById('courseFormCertificate'), CD.CERTIFICATES);

                var form = document.getElementById('courseForm');
                form.reset();
                document.getElementById('courseFormId').value = '';

                if (courseId) {
                    var course = CD.loadCourses().filter(function (c) { return c.id === courseId; })[0];
                    if (course) {
                        document.getElementById('courseFormTitle').textContent = 'Edit Course';
                        document.getElementById('courseFormId').value = course.id;
                        document.getElementById('courseFormTitleInput').value = course.title;
                        document.getElementById('courseFormField').value = course.field;
                        document.getElementById('courseFormBadge').value = course.badge;
                        document.getElementById('courseFormDuration').value = course.duration;
                        document.getElementById('courseFormInstructor').value = course.instructor;
                        document.getElementById('courseFormMode').value = course.mode;
                        document.getElementById('courseFormCertificate').value = course.certificate;
                        document.getElementById('courseFormDescription').value = course.description;
                    }
                } else {
                    document.getElementById('courseFormTitle').textContent = 'Add New Course';
                }

                document.getElementById('courseFormOverlay').classList.add('active');
            }

            function closeCourseForm() {
                document.getElementById('courseFormOverlay').classList.remove('active');
            }

            document.getElementById('openAddCourseBtn').addEventListener('click', function () { openCourseForm(null); });
            document.getElementById('cancelCourseFormBtn').addEventListener('click', closeCourseForm);
            document.getElementById('courseFormOverlay').addEventListener('click', function (e) {
                if (e.target === this) closeCourseForm();
            });

            document.getElementById('courseForm').addEventListener('submit', function (e) {
                e.preventDefault();
                var id = document.getElementById('courseFormId').value;
                var course = {
                    id: id || undefined,
                    title: document.getElementById('courseFormTitleInput').value.trim(),
                    field: document.getElementById('courseFormField').value,
                    badge: document.getElementById('courseFormBadge').value,
                    duration: document.getElementById('courseFormDuration').value.trim(),
                    instructor: document.getElementById('courseFormInstructor').value.trim(),
                    mode: document.getElementById('courseFormMode').value,
                    certificate: document.getElementById('courseFormCertificate').value,
                    description: document.getElementById('courseFormDescription').value.trim()
                };
                CD.upsertCourse(course);
                closeCourseForm();
                renderAll();
            });

            /* ---------------- Student Enrollment ---------------- */
            function renderEnrollments() {
                var enrollments = E.loadEnrollments();
                var s = E.stats();
                document.getElementById('countStudents').textContent = s.totalStudents + ' student' + (s.totalStudents === 1 ? '' : 's');
                document.getElementById('statStudents').textContent = s.totalStudents;
                document.getElementById('statEnrollments').textContent = s.totalEnrollments;

                var body = document.getElementById('enrollmentPanelBody');
                if (!enrollments.length) {
                    body.innerHTML = emptyState('No students have enrolled yet. Enrollment records will be listed here.');
                    return;
                }

                var sorted = enrollments.slice().sort(function (a, b) {
                    return new Date(b.enrolledAt) - new Date(a.enrolledAt);
                });

                var rows = sorted.map(function (e) {
                    var statusClass = e.status === 'completed' ? 'completed' : 'pending';
                    var statusLabel = e.status === 'completed' ? 'Completed' : 'Pending';
                    var toggleLabel = e.status === 'completed' ? 'Mark Pending' : 'Mark Completed';
                    var toggleTo = e.status === 'completed' ? 'pending' : 'completed';
                    var dateStr = e.enrolledAt ? new Date(e.enrolledAt).toLocaleDateString() : '';
                    var pct = e.progress || 0;
                    var progressHtml = '<div style="min-width:120px;">' +
                        '<div class="progress-track" style="margin:0 0 4px;"><div class="progress-fill' + (pct >= 100 ? ' is-complete' : '') + '" style="width:' + pct + '%;"></div></div>' +
                        '<span style="font-size:0.74rem; color: var(--text-muted); font-weight:600;">' + pct + '%</span>' +
                    '</div>';
                    return '<tr>' +
                        '<td>' + escapeHtml(e.studentName) + '</td>' +
                        '<td>' + escapeHtml(e.rollNo) + '</td>' +
                        '<td>' + escapeHtml(e.courseTitle) + '</td>' +
                        '<td>' + escapeHtml(CD.fieldLabel(e.field)) + '</td>' +
                        '<td>' + progressHtml + '</td>' +
                        '<td><span class="status-badge ' + statusClass + '">' + statusLabel + '</span></td>' +
                        '<td>' + dateStr + '</td>' +
                        '<td class="table-actions">' +
                            '<button class="btn btn-toggle-status btn-tiny toggle-status-btn" data-id="' + e.id + '" data-to="' + toggleTo + '">' + toggleLabel + '</button>' +
                            '<button class="btn btn-danger btn-tiny remove-enrollment-btn" data-id="' + e.id + '">Remove</button>' +
                        '</td>' +
                    '</tr>';
                }).join('');

                body.innerHTML = '<div class="dash-table-wrap"><table class="dash-table">' +
                    '<thead><tr><th>Student Name</th><th>Roll No</th><th>Course</th><th>Field</th><th>Progress</th><th>Status</th><th>Enrolled</th><th>Actions</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table></div>';

                body.querySelectorAll('.toggle-status-btn').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        E.setStatusById(btn.getAttribute('data-id'), btn.getAttribute('data-to'));
                        renderAll();
                    });
                });
                body.querySelectorAll('.remove-enrollment-btn').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        if (confirm('Remove this enrollment record?')) {
                            E.removeById(btn.getAttribute('data-id'));
                            renderAll();
                        }
                    });
                });
            }

            /* ---------------- Platform Analytics ---------------- */
            function renderAnalytics() {
                var enrollments = E.loadEnrollments();
                var s = E.stats();
                var panel = document.getElementById('analyticsPanelBody');
                var countBadge = document.getElementById('analyticsCount');

                if (!enrollments.length) {
                    countBadge.textContent = 'No data';
                    panel.innerHTML = emptyState('Analytics will populate once there is platform activity to report on.');
                    return;
                }

                countBadge.textContent = s.totalEnrollments + ' data points';
                var completionRate = s.totalEnrollments ? Math.round((s.totalCompleted / s.totalEnrollments) * 100) : 0;

                var byField = {};
                enrollments.forEach(function (e) {
                    byField[e.field] = (byField[e.field] || 0) + 1;
                });
                var maxCount = Math.max.apply(null, Object.keys(byField).map(function (k) { return byField[k]; }).concat([1]));

                var barsHtml = CD.FIELDS.filter(function (f) { return byField[f.id]; }).map(function (f) {
                    var count = byField[f.id] || 0;
                    var pct = Math.round((count / maxCount) * 100);
                    return '<div class="bar-row">' +
                        '<span>' + escapeHtml(f.label) + '</span>' +
                        '<div class="bar-track"><div class="bar-fill" style="width:' + pct + '%;"></div></div>' +
                        '<span>' + count + '</span>' +
                    '</div>';
                }).join('');

                panel.innerHTML =
                    '<div class="analytics-grid">' +
                        '<div class="analytics-card"><h3>' + s.totalEnrollments + '</h3><p>Total Enrollments</p></div>' +
                        '<div class="analytics-card"><h3>' + completionRate + '%</h3><p>Completion Rate</p></div>' +
                        '<div class="analytics-card"><h3>' + s.totalPending + '</h3><p>In Progress</p></div>' +
                    '</div>' +
                    '<div style="padding: 4px 28px 28px; border-top: 1px solid var(--border-color);">' +
                        '<h4 style="font-size:0.95rem; margin: 20px 0 6px;">Enrollments by Field</h4>' +
                        barsHtml +
                    '</div>';
            }

            function renderAll() {
                renderCurriculum();
                renderEnrollments();
                renderAnalytics();
            }

            renderAll();

            // Keep the admin view live: if a student enrolls or completes
            // a module in another tab, refresh automatically.
            window.addEventListener('storage', function (e) {
                if (e.key === 'edutrack_enrollments' || e.key === 'edutrack_courses') {
                    renderAll();
                }
            });
        })();
};

/* ---------- admin-login ---------- */
EduTrack.pages['admin-login'] = function () {
document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            var email = document.getElementById('email').value;
            var pass = document.getElementById('password').value;

            // NOTE: this project doesn't have a real authentication backend
            // wired up yet, so this simply checks against a fixed admin
            // credential pair.
            if (email === "admin@institute.edu" && pass === "12341234") {
                localStorage.setItem("isAdminVerified", "true");
                window.location.href = "admin-dashboard.html";
            } else {
                alert("Invalid Security Tokens. Elevated access structure rejected.");
            }
        });
};

/* ---------- admin-schema-login ---------- */
EduTrack.pages['admin-schema-login'] = function () {
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('admin-email').value;
            const pass = document.getElementById('admin-pass').value;

            // Verification logic
            if (email === "admin@institute.edu" && pass === "12341234") {
                localStorage.setItem("isAdminVerified", "true");
                // Redirect to the edit page
                window.location.href = "edit-course.html";
            } else {
                alert("Invalid Security Tokens. Elevated access structure rejected.");
            }
        });
};

/* ---------- course ---------- */
EduTrack.pages['course'] = function () {
(function () {
            var params = new URLSearchParams(window.location.search);
            var courseId = params.get('course') || params.get('id');

            var Data = window.EduTrackData;
            var Content = window.EduTrackCourseContent;
            var E = window.EduTrackEnrollments;

            if (!courseId || !Data) {
                document.getElementById('notFoundState').style.display = 'block';
                return;
            }

            var allCourses = Data.loadCourses();
            var course = allCourses.filter(function (c) { return c.id === courseId; })[0];

            if (!course) {
                document.getElementById('notFoundState').style.display = 'block';
                return;
            }

            document.getElementById('courseRoot').style.display = 'block';
            document.title = course.title + ' | EduTrack';

            document.getElementById('courseBadge').textContent = course.badge;
            document.getElementById('courseTitle').textContent = course.title;
            document.getElementById('courseDescription').textContent = course.description;
            document.getElementById('metaInstructor').textContent = 'Instructor: ' + course.instructor;
            document.getElementById('metaDuration').textContent = course.duration;
            document.getElementById('metaMode').textContent = course.mode;
            document.getElementById('metaField').textContent = Data.fieldLabel(course.field);

            document.getElementById('sideInstructor').textContent = course.instructor;
            document.getElementById('sideDuration').textContent = course.duration;
            document.getElementById('sideMode').textContent = course.mode;
            document.getElementById('sideCertificate').textContent = course.certificate;

            var modules = Content.getModules(course);
            var totalModules = modules.length;

            var student = E.getCurrentStudent();
            var enrolled = student && student.rollNo ? E.isEnrolled(student.rollNo, course.id) : false;

            var enrollUrl = 'stu-login-enroll.html?course=' + encodeURIComponent(course.id) +
                '&title=' + encodeURIComponent(course.title) + '&field=' + encodeURIComponent(course.field);
            document.getElementById('enrollNowLink').href = enrollUrl;

            var actionCard = document.getElementById('actionCard');
            var modulesContainer = document.getElementById('modulesContainer');

            function renderActionCard(enrollment) {
                if (!student || !student.rollNo || !enrollment) {
                    actionCard.innerHTML =
                        '<h4>Get Started</h4>' +
                        '<p style="font-size:0.85rem; margin-bottom:16px;">Enroll to unlock all modules and start tracking your progress.</p>' +
                        '<a href="' + enrollUrl + '" class="btn btn-primary btn-complete">Enroll in this Course</a>';
                    return;
                }

                if (enrollment.status === 'completed') {
                    var hasCert = course.certificate === 'Yes';
                    var certButtonHTML = hasCert
                        ? '<button type="button" id="downloadCertBtn" class="btn btn-primary btn-complete" style="width:100%; margin-bottom:10px;">&#127942; Download Certificate</button>'
                        : '';
                    var goToCoursesClass = hasCert ? 'btn btn-outline btn-complete' : 'btn btn-primary btn-complete';
                    actionCard.innerHTML =
                        '<h4>&#9989; Course Completed</h4>' +
                        '<p style="font-size:0.85rem; margin-bottom:16px;">Great work! You\'ve finished every module in this course.</p>' +
                        certButtonHTML +
                        '<a href="student-dashboard.html" class="' + goToCoursesClass + '">Go to My Courses</a>';

                    if (hasCert) {
                        var certBtn = document.getElementById('downloadCertBtn');
                        if (certBtn) {
                            certBtn.addEventListener('click', function () {
                                downloadCertificate(enrollment);
                            });
                        }
                    }
                } else {
                    actionCard.innerHTML =
                        '<h4>You\'re Enrolled</h4>' +
                        '<p style="font-size:0.85rem; margin-bottom:16px;">Complete the Photo, Video and Theory parts of every module below to finish this course.</p>' +
                        '<a href="student-dashboard.html" class="btn btn-outline btn-complete">Go to My Courses</a>';
                }
            }

            // Generates and downloads a "Certificate of Completion" PDF for
            // this enrollment. Only ever called when the course offers a
            // certificate AND the enrollment is fully completed.
            function downloadCertificate(enrollment) {
                if (!window.jspdf || !window.jspdf.jsPDF) {
                    window.alert('Certificate generator failed to load.');
                    return;
                }

                var studentName = enrollment.studentName || (student && student.studentName) || 'Student';
                var courseTitle = course.title;
                var orgName = 'EduTrack';
                var dateStr = new Date(enrollment.completedAt || Date.now()).toLocaleDateString(undefined, {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                var doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
                var pageWidth = doc.internal.pageSize.getWidth();
                var pageHeight = doc.internal.pageSize.getHeight();

                var navy = [21, 35, 64];
                var gold = [196, 155, 74];

                // Decorative Borders
                doc.setDrawColor(navy[0], navy[1], navy[2]);
                doc.setLineWidth(5);
                doc.rect(20, 20, pageWidth - 40, pageHeight - 40);
                doc.setDrawColor(gold[0], gold[1], gold[2]);
                doc.setLineWidth(1);
                doc.rect(30, 30, pageWidth - 60, pageHeight - 60);

                // Organization Header
                doc.setTextColor(navy[0], navy[1], navy[2]);
                doc.setFont('times', 'bold');
                doc.setFontSize(18);
                doc.text(orgName.toUpperCase(), pageWidth / 2, 100, { align: 'center' });

                // Main Title
                doc.setFontSize(48);
                doc.text('Certificate of Completion', pageWidth / 2, 180, { align: 'center' });

                // Subtitle
                doc.setFont('times', 'italic');
                doc.setFontSize(18);
                doc.text('This is to certify that', pageWidth / 2, 240, { align: 'center' });

                // Student Name
                doc.setFont('times', 'bold');
                doc.setFontSize(40);
                doc.setTextColor(gold[0], gold[1], gold[2]);
                doc.text(studentName, pageWidth / 2, 300, { align: 'center' });
                
                // Underline for name
                doc.line(pageWidth / 2 - 200, 315, pageWidth / 2 + 200, 315);

                // Body Text
                doc.setTextColor(navy[0], navy[1], navy[2]);
                doc.setFont('times', 'normal');
                doc.setFontSize(18);
                doc.text('has successfully completed the course requirements for', pageWidth / 2, 370, { align: 'center' });

                // Course Title
                doc.setFont('times', 'bold');
                doc.setFontSize(28);
                doc.text(courseTitle, pageWidth / 2, 420, { align: 'center' });

                // Footer Dates
                doc.setFont('times', 'normal');
                doc.setFontSize(14);
                doc.text('Awarded on ' + dateStr, pageWidth / 2, pageHeight - 100, { align: 'center' });
                doc.text(orgName + ' Systems', pageWidth / 2, pageHeight - 80, { align: 'center' });

                doc.save((courseTitle + '-Certificate.pdf').replace(/[^a-z0-9]+/gi, '_'));
            }

            function updateProgressUI(enrollment) {
                var progress = enrollment ? enrollment.progress : 0;
                var completedCount = 0;
                if (enrollment && enrollment.moduleProgress) {
                    modules.forEach(function (m) {
                        if (E.isModuleComplete(enrollment.moduleProgress[m.id])) completedCount++;
                    });
                }
                document.getElementById('progressValue').textContent = progress + '%';
                document.getElementById('progressModulesLabel').textContent = completedCount + ' of ' + totalModules + ' modules completed';
                var fill = document.getElementById('progressFillBar');
                fill.style.width = progress + '%';
                fill.classList.toggle('is-complete', progress >= 100);
            }

            function youtubeEmbedUrl(url) {
                // Accepts a plain YouTube watch/share URL (or an already-embed
                // URL, or a direct video file URL) and returns something safe
                // to drop into an <iframe src="...">.
                var ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([\w-]{11})/);
                if (ytMatch) return 'https://www.youtube.com/embed/' + ytMatch[1];
                return url;
            }

            function partIcon(done) {
                return done ? '<span class="tab-check">&#10003;</span>' : '';
            }

            function moduleStatusMeta(part) {
                var doneCount = 0;
                if (part.photo) doneCount++;
                if (part.video) doneCount++;
                if (part.theory) doneCount++;
                if (doneCount === 3) return { cls: 'completed', label: 'Completed' };
                if (doneCount === 0) return { cls: 'not-started', label: 'Not Started' };
                return { cls: 'in-progress', label: 'In Progress (' + doneCount + '/3)' };
            }

            function renderModules() {
                var enrollment = (student && student.rollNo) ? E.getEnrollment(student.rollNo, course.id) : null;
                document.getElementById('enrollBanner').style.display = enrollment ? 'none' : 'block';
                renderActionCard(enrollment);
                updateProgressUI(enrollment);

                modulesContainer.innerHTML = '';

                modules.forEach(function (m, mIndex) {
                    var part = enrollment && enrollment.moduleProgress ? (enrollment.moduleProgress[m.id] || { photo: false, video: false, theory: false }) : { photo: false, video: false, theory: false };
                    var meta = moduleStatusMeta(part);

                    var card = document.createElement('div');
                    card.className = 'module-card' + (meta.cls === 'completed' ? ' is-complete' : '');
                    card.setAttribute('data-module-id', m.id);

                    var locked = !enrollment;

                    card.innerHTML =
                        '<div class="module-card-header">' +
                            '<div>' +
                                '<span class="module-number">Module ' + (mIndex + 1) + '</span>' +
                            '</div>' +
                            '<span class="module-status ' + meta.cls + '">' + meta.label + '</span>' +
                        '</div>' +
                        '<h4>' + m.shortTitle + '</h4>' +
                        '<div class="module-tabs">' +
                            '<button type="button" class="tab-btn active" data-tab="photo">&#128247; Photo ' + partIcon(part.photo) + '</button>' +
                            '<button type="button" class="tab-btn" data-tab="video">&#127916; Video ' + partIcon(part.video) + '</button>' +
                            '<button type="button" class="tab-btn" data-tab="theory">&#128214; Theory ' + partIcon(part.theory) + '</button>' +
                        '</div>' +
                        '<div class="module-pane active" data-pane="photo">' +
                            '<div class="photo-box" style="background: linear-gradient(135deg, ' + m.photo.colorFrom + ', ' + m.photo.colorTo + ');">' +
                                (m.photo.imageUrl
                                    ? '<img src="' + m.photo.imageUrl + '" alt="' + m.photo.caption + '" style="width:100%;height:100%;object-fit:cover;border-radius:inherit;">'
                                    : '<span class="photo-emoji">' + m.photo.emoji + '</span>') +
                                '<div class="video-caption">' + m.photo.caption + '</div>' +
                            '</div>' +
                            '<span class="' + (part.photo ? 'viewed-tag' : 'pending-tag') + '">' + (part.photo ? '&#10003; Viewed' : 'Viewing marks this as seen') + '</span>' +
                        '</div>' +
                        '<div class="module-pane" data-pane="video">' +
                            (m.video.url
                                ? '<div class="video-placeholder" style="cursor:default;">' +
                                        '<span class="video-ai-tag">' + m.video.duration + '</span>' +
                                        '<iframe src="' + youtubeEmbedUrl(m.video.url) + '" style="width:100%;height:100%;border:0;border-radius:inherit;position:relative;z-index:1;" allow="autoplay; encrypted-media" allowfullscreen></iframe>' +
                                        '<div class="video-caption">' + m.video.caption + '</div>' +
                                    '</div>' +
                                    (part.video
                                        ? '<span class="viewed-tag">&#10003; Viewed</span>'
                                        : '<button type="button" class="btn btn-outline" data-play-module="' + m.id + '" style="margin-top:10px;">Mark video as watched</button>')
                                : '<div class="video-placeholder">' +
                                        '<span class="video-ai-tag">' + m.video.duration + '</span>' +
                                        (part.video
                                            ? '<span style="color:#7FD9A6; font-weight:700; z-index:1;">&#9654; Playing complete</span>'
                                            : '<button type="button" class="video-play-btn" data-play-module="' + m.id + '"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></button>') +
                                        '<div class="video-caption">' + m.video.caption + '</div>' +
                                    '</div>' +
                                    '<span class="' + (part.video ? 'viewed-tag' : 'pending-tag') + '">' + (part.video ? '&#10003; Viewed' : 'Click play to mark as viewed') + '</span>') +
                        '</div>' +
                        '<div class="module-pane" data-pane="theory">' +
                            '<div class="theory-box' + (part.theory ? ' scrolled-end' : '') + '" data-theory-module="' + m.id + '">' + m.theory.text + '</div>' +
                            '<span class="' + (part.theory ? 'viewed-tag' : 'pending-tag') + '">' + (part.theory ? '&#10003; Viewed' : 'Scroll to the end to mark as read') + '</span>' +
                        '</div>';

                    modulesContainer.appendChild(card);

                    // ---- Tab switching ----
                    var tabButtons = card.querySelectorAll('.tab-btn');
                    tabButtons.forEach(function (btn) {
                        btn.addEventListener('click', function () {
                            var tabName = btn.getAttribute('data-tab');
                            tabButtons.forEach(function (b) { b.classList.remove('active'); });
                            btn.classList.add('active');
                            card.querySelectorAll('.module-pane').forEach(function (p) { p.classList.remove('active'); });
                            card.querySelector('[data-pane="' + tabName + '"]').classList.add('active');

                            // Opening the Photo tab marks it as viewed
                            if (tabName === 'photo' && enrollment && !part.photo) {
                                markAndRefresh(m.id, 'photo');
                            }
                        });
                    });

                    // ---- Video play marks viewed ----
                    var playBtn = card.querySelector('[data-play-module="' + m.id + '"]');
                    if (playBtn && enrollment) {
                        playBtn.addEventListener('click', function () {
                            markAndRefresh(m.id, 'video');
                        });
                    }

                    // ---- Theory scroll-to-end marks viewed ----
                    var theoryBox = card.querySelector('[data-theory-module="' + m.id + '"]');
                    if (theoryBox && enrollment && !part.theory) {
                        theoryBox.addEventListener('scroll', function () {
                            var reachedEnd = theoryBox.scrollTop + theoryBox.clientHeight >= theoryBox.scrollHeight - 8;
                            if (reachedEnd) {
                                markAndRefresh(m.id, 'theory');
                            }
                        });
                    }

                    if (locked) {
                        card.style.opacity = '0.6';
                        card.style.pointerEvents = 'none';
                    }
                });
            }

            function markAndRefresh(moduleId, part) {
                if (!student || !student.rollNo) return;
                E.markPartViewed(student.rollNo, course.id, moduleId, part, totalModules);
                renderModules();
            }

            renderModules();
        })();
};

/* ---------- courses ---------- */
EduTrack.pages['courses'] = function () {
(function () {
            function escapeHtml(str) {
                var div = document.createElement('div');
                div.textContent = str == null ? '' : String(str);
                return div.innerHTML;
            }

            function courseCardHTML(course) {
                return '' +
                    '<div class="course-card" data-course-id="' + escapeHtml(course.id) + '">' +
                        '<div class="course-card-top">' +
                            '<span class="course-badge">' + escapeHtml(course.badge) + '</span>' +
                            '<span class="course-duration">' + escapeHtml(course.duration) + '</span>' +
                        '</div>' +
                        '<h3>' + escapeHtml(course.title) + '</h3>' +
                        '<p>' + escapeHtml(course.description) + '</p>' +
                        '<ul class="course-meta">' +
                            '<li>Instructor: ' + escapeHtml(course.instructor) + '</li>' +
                            '<li>Mode: ' + escapeHtml(course.mode) + '</li>' +
                            '<li>Certificate: ' + escapeHtml(course.certificate) + '</li>' +
                        '</ul>' +
                        '<div class="course-card-actions">' +
                            '<a href="stu-login-enroll.html?course=' + encodeURIComponent(course.id) + '&title=' + encodeURIComponent(course.title) + '&field=' + encodeURIComponent(course.field) + '" class="btn btn-primary btn-enroll">Enroll</a>' +
                            '<a href="admin-schema-login.html" class="btn btn-edit">Edit Schema</a>' +
                        '</div>' +
                    '</div>';
            }

            function renderCourses() {
                var courses = window.EduTrackData.loadCourses();
                var grids = document.querySelectorAll('.course-grid[data-field]');
                grids.forEach(function (grid) {
                    var fieldId = grid.getAttribute('data-field');
                    var matching = courses.filter(function (c) { return c.field === fieldId; });
                    grid.innerHTML = matching.length
                        ? matching.map(courseCardHTML).join('')
                        : '<p style="color: var(--text-muted);">No courses in this field yet.</p>';
                });
            }

            function normalize(str) {
                return (str == null ? '' : String(str)).toLowerCase();
            }

            function setupSearch() {
                var input = document.getElementById('courseSearchInput');
                var noResults = document.getElementById('noSearchResults');

                input.addEventListener('input', function () {
                    var query = normalize(input.value.trim());
                    var anyMatchesAnywhere = false;

                    document.querySelectorAll('.course-field').forEach(function (section) {
                        var cards = section.querySelectorAll('.course-card');
                        var visibleCount = 0;

                        cards.forEach(function (card) {
                            var haystack = normalize(card.textContent);
                            var isMatch = !query || haystack.indexOf(query) !== -1;
                            card.style.display = isMatch ? '' : 'none';
                            if (isMatch) visibleCount++;
                        });

                        // Sections with zero courses to begin with (showing the
                        // "No courses in this field yet" message) should stay
                        // visible; only hide sections whose courses were all
                        // filtered out by the search.
                        var sectionHasVisibleContent = cards.length === 0 || visibleCount > 0;
                        section.style.display = sectionHasVisibleContent ? '' : 'none';
                        if (cards.length > 0 && visibleCount > 0) anyMatchesAnywhere = true;
                    });

                    noResults.style.display = (query && !anyMatchesAnywhere) ? 'block' : 'none';
                });
            }

            function isLoggedIn() {
                var student = window.EduTrackEnrollments && window.EduTrackEnrollments.getCurrentStudent();
                return !!(student && student.rollNo);
            }

            function setupAuthUI() {
                var dashboardItem = document.getElementById('navDashboardItem');
                var authBtn = document.getElementById('navAuthBtn');

                if (isLoggedIn()) {
                    dashboardItem.style.display = '';
                    authBtn.textContent = 'Logout';
                    authBtn.href = '#';
                    authBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        window.EduTrackEnrollments.clearCurrentStudent();
                        window.location.href = 'login-selection.html';
                    });
                } else {
                    dashboardItem.style.display = 'none';
                }
            }

            // Enrolling requires an active student session. If nobody is
            // logged in, block navigation to the enrollment page and send
            // them to log in first instead.
            function setupEnrollGate() {
                document.addEventListener('click', function (e) {
                    var link = e.target.closest ? e.target.closest('.btn-enroll') : null;
                    if (!link) return;
                    if (!isLoggedIn()) {
                        e.preventDefault();
                        alert('Please login first to enroll in a course.');
                        window.location.href = 'login-selection.html';
                    }
                });
            }

            renderCourses();
            setupSearch();
            setupAuthUI();
            setupEnrollGate();
        })();
};

EduTrack.pages['edit-course'] = function () {
(function () {
            var data = window.EduTrackData;
            var Content = window.EduTrackCourseContent;
            var currentId = null; // null = adding a new course
            var currentModules = []; // array of plain module objects backing the modules editor

            var els = {
                list: document.getElementById('courseListByField'),
                form: document.getElementById('courseForm'),
                editorTitle: document.getElementById('editorTitle'),
                editorSubtitle: document.getElementById('editorSubtitle'),
                id: document.getElementById('course-id'),
                field: document.getElementById('course-field'),
                title: document.getElementById('course-title'),
                badge: document.getElementById('course-badge'),
                duration: document.getElementById('course-duration'),
                description: document.getElementById('course-description'),
                instructor: document.getElementById('course-instructor'),
                mode: document.getElementById('course-mode'),
                certificate: document.getElementById('course-certificate'),
                deleteBtn: document.getElementById('deleteBtn'),
                toast: document.getElementById('saveToast'),
                modulesEditor: document.getElementById('modulesEditor'),
                addModuleBtn: document.getElementById('addModuleBtn')
            };

            function fillSelect(select, options) {
                select.innerHTML = options.map(function (opt) {
                    return '<option value="' + opt + '">' + opt + '</option>';
                }).join('');
            }

            function populateStaticSelects() {
                fillSelect(els.field, data.FIELDS.map(function (f) { return f.id; }));
                // Replace field select options with label text but field id values
                els.field.innerHTML = data.FIELDS.map(function (f) {
                    return '<option value="' + f.id + '">' + f.label + '</option>';
                }).join('');
                fillSelect(els.badge, data.BADGES);
                fillSelect(els.mode, data.MODES);
                fillSelect(els.certificate, data.CERTIFICATES);
            }

            function renderSidebar() {
                var courses = data.loadCourses();
                els.list.innerHTML = data.FIELDS.map(function (f) {
                    var inField = courses.filter(function (c) { return c.field === f.id; });
                    if (!inField.length) return '';
                    var items = inField.map(function (c) {
                        var activeClass = c.id === currentId ? ' active' : '';
                        return '<li><button type="button" class="course-item' + activeClass + '" data-id="' + c.id + '">' + c.title + '</button></li>';
                    }).join('');
                    return '' +
                        '<div class="sidebar-field-group">' +
                            '<div class="sidebar-field-label">' + f.label + '</div>' +
                            '<ul>' + items + '</ul>' +
                        '</div>';
                }).join('');

                els.list.querySelectorAll('.course-item').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        loadCourseIntoForm(btn.getAttribute('data-id'));
                    });
                });
            }

            function blankModule(index) {
                return {
                    title: 'Module ' + (index + 1),
                    photoCaption: '',
                    photoUrl: '',
                    videoCaption: '',
                    videoDuration: '',
                    videoUrl: '',
                    theoryText: ''
                };
            }

            function escapeAttr(str) {
                return (str == null ? '' : String(str)).replace(/"/g, '&quot;');
            }

            function moduleCardHTML(m, index) {
                return '' +
                    '<div class="module-editor-card" data-module-index="' + index + '">' +
                        '<div class="module-editor-header">' +
                            '<strong>Module ' + (index + 1) + '</strong>' +
                            '<button type="button" class="btn-remove-module" data-index="' + index + '">Remove</button>' +
                        '</div>' +
                        '<div class="field">' +
                            '<label>Module Title</label>' +
                            '<input type="text" class="mod-title" value="' + escapeAttr(m.title) + '" placeholder="e.g. Foundations & Problem Framing">' +
                        '</div>' +
                        '<div class="form-row">' +
                            '<div class="field">' +
                                '<label>Photo Caption</label>' +
                                '<input type="text" class="mod-photo-caption" value="' + escapeAttr(m.photoCaption) + '" placeholder="Visual overview — ...">' +
                            '</div>' +
                            '<div class="field">' +
                                '<label>Photo Image URL</label>' +
                                '<input type="text" class="mod-photo-url" value="' + escapeAttr(m.photoUrl) + '" placeholder="Leave blank for default icon">' +
                            '</div>' +
                        '</div>' +
                        '<div class="form-row">' +
                            '<div class="field">' +
                                '<label>Video Caption</label>' +
                                '<input type="text" class="mod-video-caption" value="' + escapeAttr(m.videoCaption) + '" placeholder="Video walkthrough — ...">' +
                            '</div>' +
                            '<div class="field">' +
                                '<label>Video Duration</label>' +
                                '<input type="text" class="mod-video-duration" value="' + escapeAttr(m.videoDuration) + '" placeholder="e.g. 5 min">' +
                            '</div>' +
                        '</div>' +
                        '<div class="field">' +
                            '<label>Video URL</label>' +
                            '<input type="text" class="mod-video-url" value="' + escapeAttr(m.videoUrl) + '" placeholder="YouTube link or .mp4 URL — leave blank for placeholder player">' +
                            '<span class="field-hint">Paste a normal YouTube link (e.g. https://www.youtube.com/watch?v=...) or a direct video file URL.</span>' +
                        '</div>' +
                        '<div class="field">' +
                            '<label>Theory Text</label>' +
                            '<textarea class="mod-theory-text" placeholder="Write the theory content students will read for this module...">' + (m.theoryText || '') + '</textarea>' +
                        '</div>' +
                    '</div>';
            }

            function renderModulesEditor() {
                els.modulesEditor.innerHTML = currentModules.map(moduleCardHTML).join('');
                els.modulesEditor.querySelectorAll('.btn-remove-module').forEach(function (btn) {
                    btn.addEventListener('click', function () {
                        var idx = parseInt(btn.getAttribute('data-index'), 10);
                        syncModulesFromDom();
                        currentModules.splice(idx, 1);
                        renderModulesEditor();
                    });
                });
            }

            // Reads whatever is currently typed in the module cards back into
            // currentModules, so nothing is lost when adding/removing a card
            // or switching to another course in the sidebar.
            function syncModulesFromDom() {
                var cards = els.modulesEditor.querySelectorAll('.module-editor-card');
                currentModules = Array.prototype.map.call(cards, function (card) {
                    return {
                        title: card.querySelector('.mod-title').value.trim(),
                        photoCaption: card.querySelector('.mod-photo-caption').value.trim(),
                        photoUrl: card.querySelector('.mod-photo-url').value.trim(),
                        videoCaption: card.querySelector('.mod-video-caption').value.trim(),
                        videoDuration: card.querySelector('.mod-video-duration').value.trim(),
                        videoUrl: card.querySelector('.mod-video-url').value.trim(),
                        theoryText: card.querySelector('.mod-theory-text').value.trim()
                    };
                });
            }

            function loadCourseIntoForm(id) {
                var courses = data.loadCourses();
                var course = courses.find(function (c) { return c.id === id; });
                if (!course) return;

                currentId = course.id;
                els.id.value = course.id;
                els.field.value = course.field;
                els.title.value = course.title;
                els.badge.value = course.badge;
                els.duration.value = course.duration;
                els.description.value = course.description;
                els.instructor.value = course.instructor;
                els.mode.value = course.mode;
                els.certificate.value = course.certificate;

                els.editorTitle.textContent = 'Edit Course';
                els.editorSubtitle.textContent = 'Update the details below and save to publish the changes.';
                els.deleteBtn.style.display = 'inline-block';

                currentModules = (course.modules && course.modules.length)
                    ? course.modules
                    : (Content ? Content.getDefaultCustomModules(course) : [blankModule(0), blankModule(1), blankModule(2), blankModule(3)]);
                renderModulesEditor();

                hideToast();
                renderSidebar();
            }

            function resetForm() {
                currentId = null;
                els.form.reset();
                els.id.value = '';
                els.field.selectedIndex = 0;
                els.badge.selectedIndex = 0;
                els.mode.selectedIndex = 0;
                els.certificate.selectedIndex = 0;
                els.editorTitle.textContent = 'Add New Course';
                els.editorSubtitle.textContent = 'Fill in the details below and save to publish it on the Courses page.';
                els.deleteBtn.style.display = 'none';

                currentModules = [blankModule(0), blankModule(1), blankModule(2), blankModule(3)];
                renderModulesEditor();

                hideToast();
                renderSidebar();
            }

            function showToast(message) {
                els.toast.textContent = message;
                els.toast.classList.add('visible');
            }

            function hideToast() {
                els.toast.classList.remove('visible');
            }

            els.form.addEventListener('submit', function (event) {
                event.preventDefault();

                syncModulesFromDom();

                var course = {
                    id: currentId,
                    field: els.field.value,
                    title: els.title.value.trim(),
                    badge: els.badge.value,
                    duration: els.duration.value.trim(),
                    description: els.description.value.trim(),
                    instructor: els.instructor.value.trim(),
                    mode: els.mode.value,
                    certificate: els.certificate.value,
                    modules: currentModules
                };

                var saved = data.upsertCourse(course);
                currentId = saved.id;
                els.id.value = saved.id;
                els.editorTitle.textContent = 'Edit Course';
                els.editorSubtitle.textContent = 'Update the details below and save to publish the changes.';
                els.deleteBtn.style.display = 'inline-block';

                showToast('Saved. This change is now live on the Courses page.');
                renderSidebar();
            });

            els.deleteBtn.addEventListener('click', function () {
                if (!currentId) return;
                if (!window.confirm('Delete this course? This cannot be undone.')) return;
                data.deleteCourse(currentId);
                resetForm();
                showToast('Course deleted.');
            });

            els.addModuleBtn.addEventListener('click', function () {
                syncModulesFromDom();
                currentModules.push(blankModule(currentModules.length));
                renderModulesEditor();
            });

            document.getElementById('addCourseBtn').addEventListener('click', resetForm);
            document.getElementById('cancelBtn').addEventListener('click', resetForm);

            document.getElementById('logoutLink').addEventListener('click', function (event) {
                event.preventDefault();
                localStorage.removeItem('isAdminVerified');
                window.location.href = 'courses.html';
            });

            populateStaticSelects();
            resetForm();
        })();
};

/* ---------- notifications ---------- */
EduTrack.pages['notifications'] = function () {
(function () {
            var E = window.EduTrackEnrollments;
            var D = window.EduTrackData;

            var ICON_BELL = 'M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z';
            var ICON_BOOK = 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z';
            var ICON_CHECK = 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';

            function fieldLabel(fieldId) {
                if (D && typeof D.fieldLabel === 'function') return D.fieldLabel(fieldId);
                return fieldId;
            }

            function emptyState(iconPath, message) {
                return '<div class="dashboard-empty">' +
                    '<svg viewBox="0 0 24 24"><path d="' + iconPath + '"/></svg>' +
                    '<p>' + message + '</p>' +
                '</div>';
            }

            function isLoggedIn() {
                var student = E && E.getCurrentStudent();
                return !!(student && student.rollNo);
            }

            // ---------------- Read/unread tracking (per browser, via localStorage) ----------------
            // New Course Alerts are shared by everyone, so they live under one
            // global key. Enrollment/certificate notifications are personal,
            // so they're scoped per roll number.
            var READ_KEY_GLOBAL = 'edutrack_notif_read_global';

            function readKeyFor(scope) {
                if (scope === 'global') return READ_KEY_GLOBAL;
                return 'edutrack_notif_read_' + scope; // scope = rollNo
            }

            function getReadIds(scope) {
                try {
                    var raw = localStorage.getItem(readKeyFor(scope));
                    return raw ? JSON.parse(raw) : [];
                } catch (e) {
                    return [];
                }
            }

            function saveReadIds(scope, ids) {
                try {
                    localStorage.setItem(readKeyFor(scope), JSON.stringify(ids));
                } catch (e) { /* storage unavailable, fail silently */ }
            }

            function markRead(scope, id) {
                var ids = getReadIds(scope);
                if (ids.indexOf(id) === -1) {
                    ids.push(id);
                    saveReadIds(scope, ids);
                }
            }

            function markAllRead(scope, allIds) {
                var ids = getReadIds(scope);
                allIds.forEach(function (id) {
                    if (ids.indexOf(id) === -1) ids.push(id);
                });
                saveReadIds(scope, ids);
            }

            function isNotifRead(scope, id) {
                return getReadIds(scope).indexOf(id) !== -1;
            }

            // Renders a notification list where each <li> tracks its own
            // read state, can be clicked to mark itself read, and reports
            // its ids back so a "Mark all as read" button can clear them all.
            function renderNotifList(panelEl, scope, items, buildItemInner) {
                if (!items.length) return [];

                var ids = items.map(function (item) { return item.id; });

                panelEl.innerHTML = '<ul class="dash-list">' + items.map(function (item) {
                    var read = isNotifRead(scope, item.id);
                    var stateClass = read ? 'notif-read' : 'notif-unread';
                    return '<li class="dash-list-item notif-item ' + stateClass + '" data-notif-id="' + item.id + '">' +
                        '<span class="notif-dot"></span>' +
                        buildItemInner(item) +
                        (read ? '<span class="notif-seen-label">Viewed</span>' : '') +
                    '</li>';
                }).join('') + '</ul>';

                panelEl.querySelectorAll('.notif-item').forEach(function (li) {
                    li.addEventListener('click', function (e) {
                        // Let "View Course" links still navigate normally;
                        // we just also record the notification as read.
                        markRead(scope, li.getAttribute('data-notif-id'));
                        li.classList.remove('notif-unread');
                        li.classList.add('notif-read');
                        if (!li.querySelector('.notif-seen-label')) {
                            li.insertAdjacentHTML('beforeend', '<span class="notif-seen-label">Viewed</span>');
                        }
                    });
                });

                return ids;
            }

            function setupAuthUI() {
                var dashboardItem = document.getElementById('navDashboardItem');
                var authBtn = document.getElementById('navAuthBtn');

                if (isLoggedIn()) {
                    dashboardItem.style.display = '';
                    authBtn.textContent = 'Logout';
                    authBtn.href = '#';
                    authBtn.addEventListener('click', function (e) {
                        e.preventDefault();
                        E.clearCurrentStudent();
                        window.location.href = 'login-selection.html';
                    });
                } else {
                    dashboardItem.style.display = 'none';
                }
            }

            var currentNewCourseIds = [];
            var currentEnrollIds = [];
            var currentCertIds = [];

            // ---- New Course Alerts: newest additions to the catalog, visible to everyone ----
            function renderNewCourseAlerts() {
                var courses = D ? D.loadCourses() : [];
                var latest = courses.slice(-6).reverse();
                var panel = document.getElementById('panelNewCourses');

                document.getElementById('countNewCourses').textContent = latest.length + ' new';

                if (!latest.length) {
                    panel.innerHTML = emptyState(ICON_BELL, 'No new course alerts right now. Check back soon!');
                    currentNewCourseIds = [];
                    return;
                }

                var items = latest.map(function (c) {
                    return { id: 'course-' + c.id, course: c };
                });

                currentNewCourseIds = renderNotifList(panel, 'global', items, function (item) {
                    var c = item.course;
                    return '<div class="dash-item-info" style="flex:1;">' +
                            '<h4>New: ' + c.title + '</h4>' +
                            '<p>' + fieldLabel(c.field) + ' &middot; ' + (c.duration || '') + '</p>' +
                        '</div>' +
                        '<a href="courses.html#' + c.field + '" class="btn btn-outline">View Course</a>';
                });
            }

            // ---- Enrollment Confirmation + Completion Certificates: personal, login required ----
            function renderPersonalNotifications() {
                var loginPrompt = document.getElementById('notifLoginPrompt');
                var personalSections = document.getElementById('personalNotifSections');
                var student = E ? E.getCurrentStudent() : null;

                if (!student || !student.rollNo) {
                    loginPrompt.style.display = 'block';
                    personalSections.style.display = 'none';
                    currentEnrollIds = [];
                    currentCertIds = [];
                    return;
                }

                loginPrompt.style.display = 'none';
                personalSections.style.display = 'block';

                var scope = student.rollNo;
                var enrollments = E.getStudentEnrollments(student.rollNo);
                var completed = enrollments.filter(function (e) { return e.status === 'completed'; });

                // Enrollment confirmations
                var panelEnroll = document.getElementById('panelEnrollConfirm');
                document.getElementById('countEnrollConfirm').textContent = enrollments.length + ' confirmations';

                if (!enrollments.length) {
                    panelEnroll.innerHTML = emptyState(ICON_BOOK, "You'll see a confirmation here as soon as you enroll in a course.");
                    currentEnrollIds = [];
                } else {
                    var enrollItems = enrollments.slice().reverse().map(function (e) {
                        return { id: 'enroll-' + e.courseId, enrollment: e };
                    });
                    currentEnrollIds = renderNotifList(panelEnroll, scope, enrollItems, function (item) {
                        var e = item.enrollment;
                        return '<div class="dash-item-info" style="flex:1;">' +
                                '<h4>Enrollment Confirmed</h4>' +
                                '<p>You\'re successfully enrolled in <strong>' + e.courseTitle + '</strong> &middot; ' + fieldLabel(e.field) + '</p>' +
                            '</div>' +
                            '<span class="status-badge pending">Confirmed</span>';
                    });
                }

                // Completion certificates
                var panelCert = document.getElementById('panelCertificates');
                document.getElementById('countCertificates').textContent = completed.length + ' earned';

                if (!completed.length) {
                    panelCert.innerHTML = emptyState(ICON_CHECK, 'Finish a course to earn your first certificate — it will show up here.');
                    currentCertIds = [];
                } else {
                    var certItems = completed.map(function (e) {
                        return { id: 'cert-' + e.courseId, enrollment: e };
                    });
                    currentCertIds = renderNotifList(panelCert, scope, certItems, function (item) {
                        var e = item.enrollment;
                        var dateStr = e.completedAt ? new Date(e.completedAt).toLocaleDateString() : '';
                        return '<div class="dash-item-info" style="flex:1;">' +
                                '<h4>Certificate Earned</h4>' +
                                '<p>Congratulations! You completed <strong>' + e.courseTitle + '</strong>' + (dateStr ? ' on ' + dateStr : '') + '.</p>' +
                            '</div>' +
                            '<span class="status-badge completed">Certified</span>';
                    });
                }
            }

            function setupMarkAllButtons() {
                var student = E ? E.getCurrentStudent() : null;
                var scope = (student && student.rollNo) ? student.rollNo : null;

                document.getElementById('markAllNewBtn').addEventListener('click', function () {
                    markAllRead('global', currentNewCourseIds);
                    renderNewCourseAlerts();
                });

                document.getElementById('markAllEnrollBtn').addEventListener('click', function () {
                    if (!scope) return;
                    markAllRead(scope, currentEnrollIds);
                    renderPersonalNotifications();
                });

                document.getElementById('markAllCertBtn').addEventListener('click', function () {
                    if (!scope) return;
                    markAllRead(scope, currentCertIds);
                    renderPersonalNotifications();
                });

                document.getElementById('markAllPageBtn').addEventListener('click', function () {
                    markAllRead('global', currentNewCourseIds);
                    if (scope) {
                        markAllRead(scope, currentEnrollIds);
                        markAllRead(scope, currentCertIds);
                    }
                    renderNewCourseAlerts();
                    renderPersonalNotifications();
                });
            }

            setupAuthUI();
            renderNewCourseAlerts();
            renderPersonalNotifications();
            setupMarkAllButtons();
        })();
};

/* ---------- stu-login-enroll ---------- */
EduTrack.pages['stu-login-enroll'] = function () {
(function () {
            var params = new URLSearchParams(window.location.search);
            var courseId = params.get('course');
            var courseTitle = params.get('title');
            var courseField = params.get('field');

            // If a course wasn't passed via query string, try to look it up
            // from the shared course store so deep-links like
            // stu-login-enroll.html?course=ai-2 still work.
            if (courseId && (!courseTitle) && window.EduTrackData) {
                var all = window.EduTrackData.loadCourses();
                var match = all.filter(function (c) { return c.id === courseId; })[0];
                if (match) {
                    courseTitle = match.title;
                    courseField = match.field;
                }
            }

            if (courseId && courseTitle) {
                var tag = document.getElementById('courseTag');
                tag.textContent = 'Enrolling in: ' + courseTitle;
                tag.style.display = 'inline-block';
                document.getElementById('formSubtitle').textContent = 'Enter your details below to complete enrollment.';
            }

            // Pre-fill (and lock) the roll number from the active login
            // session, since it must match anyway — this avoids typos
            // triggering the "wrong user" check below.
            (function prefillFromSession() {
                var E = window.EduTrackEnrollments;
                var currentStudent = E ? E.getCurrentStudent() : null;
                if (currentStudent && currentStudent.rollNo) {
                    var rollInput = document.getElementById('rollNo');
                    rollInput.value = currentStudent.rollNo;
                    rollInput.readOnly = true;
                    if (currentStudent.studentName) {
                        document.getElementById('studentName').value = currentStudent.studentName;
                    }
                }
            })();

            document.getElementById('enrollForm').addEventListener('submit', function (e) {
                e.preventDefault();
                var studentName = document.getElementById('studentName').value.trim();
                var rollNo = document.getElementById('rollNo').value.trim();

                var E = window.EduTrackEnrollments;
                var currentStudent = E ? E.getCurrentStudent() : null;

                // The person must already be logged in (via student-login.html)
                // before they can enroll.
                if (!currentStudent || !currentStudent.rollNo) {
                    alert('Please login first before enrolling.');
                    window.location.href = 'student-login.html';
                    return;
                }

                // The roll number typed here must match the one used to log
                // in — otherwise someone could enroll under a different
                // student's identity.
                if (currentStudent.rollNo.trim().toLowerCase() !== rollNo.toLowerCase()) {
                    alert('Wrong user: the roll number must match the one you logged in with.');
                    return;
                }

                if (E) {
                    E.setCurrentStudent({ studentName: studentName, rollNo: currentStudent.rollNo });

                    if (courseId) {
                        E.addEnrollment({
                            studentName: studentName,
                            rollNo: currentStudent.rollNo,
                            courseId: courseId,
                            courseTitle: courseTitle || courseId,
                            field: courseField || ''
                        });
                        var startBtn = document.getElementById('startLearningLink');
                        startBtn.href = 'course.html?course=' + encodeURIComponent(courseId);
                        startBtn.style.display = 'block';
                        document.getElementById('successMessage').textContent =
                            'You\'re enrolled in ' + (courseTitle || 'the course') + '. Start learning whenever you\'re ready.';
                    } else {
                        document.getElementById('successMessage').textContent =
                            'Your details have been recorded. Browse the catalog and enroll in a course to get started.';
                    }
                }

                document.getElementById('formView').classList.add('hidden');
                document.getElementById('successView').classList.add('active');
            });
        })();
};

/* ---------- student-dashboard ---------- */
EduTrack.pages['student-dashboard'] = function () {
(function () {
            var E = window.EduTrackEnrollments;

            // Clear the active student session on logout, so the next
            // person to log in (via student-login.html or the roll-number
            // lookup below) doesn't see this student's dashboard.
            document.getElementById('logoutLink').addEventListener('click', function () {
                E.clearCurrentStudent();
            });

            function fieldLabel(fieldId) {
                if (window.EduTrackData) return window.EduTrackData.fieldLabel(fieldId);
                return fieldId;
            }

            function emptyState(iconPath, message) {
                return '<div class="dashboard-empty">' +
                    '<svg viewBox="0 0 24 24"><path d="' + iconPath + '"/></svg>' +
                    '<p>' + message + '</p>' +
                '</div>';
            }

            var ICON_BOOK = 'M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm0 2.18l7 3.82-7 3.82-7-3.82 7-3.82zM12 18.82l-5-2.73v-4.36L12 14.5l5-2.73v4.36l-5 2.73z';
            var ICON_CHECK = 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z';
            var ICON_PROGRESS = 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z';

            function render() {
                var student = E.getCurrentStudent();

                if (!student || !student.rollNo) {
                    document.getElementById('lookupSection').style.display = 'block';
                    document.getElementById('dashboardContent').style.display = 'none';
                    return;
                }

                document.getElementById('lookupSection').style.display = 'none';
                document.getElementById('dashboardContent').style.display = 'block';

                document.getElementById('welcomeHeading').textContent = 'Welcome, ' + (student.studentName || 'Student');
                document.getElementById('welcomeSub').textContent = "Here's an overview of your learning journey.";
                var switchLink = document.getElementById('switchStudentLink');
                switchLink.style.display = 'inline-block';
                switchLink.onclick = function (e) {
                    e.preventDefault();
                    E.clearCurrentStudent();
                    render();
                };

                var enrollments = E.getStudentEnrollments(student.rollNo);
                var pending = enrollments.filter(function (e) { return e.status !== 'completed'; });
                var completed = enrollments.filter(function (e) { return e.status === 'completed'; });

                document.getElementById('countInProgress').textContent = pending.length + ' in progress';
                document.getElementById('countMyCourses').textContent = enrollments.length + ' enrolled';
                document.getElementById('countCompleted').textContent = completed.length + ' completed';

                function progressBarHTML(progress) {
                    var pct = progress || 0;
                    return '<div style="min-width:160px; flex:1;">' +
                        '<div class="progress-label"><span>' + pct + '% complete</span></div>' +
                        '<div class="progress-track"><div class="progress-fill' + (pct >= 100 ? ' is-complete' : '') + '" style="width:' + pct + '%;"></div></div>' +
                    '</div>';
                }

                // ---- Learning Process (in progress) ----
                var panelProgress = document.getElementById('panelInProgress');
                if (!pending.length) {
                    panelProgress.innerHTML = emptyState(ICON_PROGRESS, 'No learning activity yet. Once you start a course, your progress will appear here.');
                } else {
                    panelProgress.innerHTML = '<ul class="dash-list">' + pending.map(function (e) {
                        return '<li class="dash-list-item">' +
                            '<div class="dash-item-info" style="flex:1;">' +
                                '<h4>' + e.courseTitle + '</h4>' +
                                '<p>' + fieldLabel(e.field) + ' &middot; In progress</p>' +
                            '</div>' +
                            progressBarHTML(e.progress) +
                            '<a href="course.html?course=' + encodeURIComponent(e.courseId) + '" class="btn btn-primary" style="padding:9px 18px; font-size:0.85rem;">Continue Learning</a>' +
                        '</li>';
                    }).join('') + '</ul>';
                }

                // ---- My Courses (all) ----
                var panelMy = document.getElementById('panelMyCourses');
                if (!enrollments.length) {
                    panelMy.innerHTML = emptyState(ICON_BOOK, "You haven't enrolled in any courses yet. Browse the catalog to get started.");
                } else {
                    panelMy.innerHTML = '<ul class="dash-list">' + enrollments.map(function (e) {
                        var statusClass = e.status === 'completed' ? 'completed' : 'pending';
                        var statusLabel = e.status === 'completed' ? 'Completed' : 'Pending';
                        return '<li class="dash-list-item">' +
                            '<div class="dash-item-info" style="flex:1;">' +
                                '<h4>' + e.courseTitle + '</h4>' +
                                '<p>' + fieldLabel(e.field) + '</p>' +
                            '</div>' +
                            progressBarHTML(e.progress) +
                            '<span class="status-badge ' + statusClass + '">' + statusLabel + '</span>' +
                            '<a href="course.html?course=' + encodeURIComponent(e.courseId) + '" class="btn btn-outline" style="margin-left:12px;">Open</a>' +
                        '</li>';
                    }).join('') + '</ul>';
                }

                // ---- Completed Courses ----
                var panelCompleted = document.getElementById('panelCompleted');
                if (!completed.length) {
                    panelCompleted.innerHTML = emptyState(ICON_CHECK, 'No completed courses yet. Finished courses and certificates will be listed here.');
                } else {
                    panelCompleted.innerHTML = '<ul class="dash-list">' + completed.map(function (e) {
                        var dateStr = e.completedAt ? new Date(e.completedAt).toLocaleDateString() : '';
                        return '<li class="dash-list-item">' +
                            '<div class="dash-item-info">' +
                                '<h4>' + e.courseTitle + '</h4>' +
                                '<p>' + fieldLabel(e.field) + (dateStr ? ' &middot; Completed ' + dateStr : '') + '</p>' +
                            '</div>' +
                            '<span class="status-badge completed">Certified</span>' +
                        '</li>';
                    }).join('') + '</ul>';
                }
            }

            document.getElementById('lookupForm').addEventListener('submit', function (e) {
                e.preventDefault();
                var roll = document.getElementById('lookupRoll').value.trim();
                var existing = E.getStudentEnrollments(roll);
                var name = existing.length ? existing[0].studentName : 'Student';
                E.setCurrentStudent({ studentName: name, rollNo: roll });
                render();
            });

            render();
        })();
};

/* ---------- student-login ---------- */
EduTrack.pages['student-login'] = function () {
document.querySelector('.auth-form-wrap form').addEventListener('submit', function (event) {
            event.preventDefault();

            // NOTE: this project doesn't have a real authentication backend
            // wired up yet, so email/password aren't actually verified.
            // Instead we use the roll number (the same identifier used
            // during enrollment) to load the correct student's session,
            // so logging in here always shows *that* student's dashboard
            // rather than whichever student happened to be logged in last.
            var rollNo = document.getElementById('rollNo').value.trim();

            if (window.EduTrackEnrollments) {
                var E = window.EduTrackEnrollments;
                var existing = E.getStudentEnrollments(rollNo);
                var name = existing.length ? existing[0].studentName : 'Student';
                E.setCurrentStudent({ studentName: name, rollNo: rollNo });
            }

            window.location.href = 'courses.html';
        });
};

/* ============================== Dispatcher ============================== */
document.addEventListener('DOMContentLoaded', function () {
    var init = EduTrack.pages[EduTrack.currentPage];
    if (typeof init === 'function') {
        init();
    }
});