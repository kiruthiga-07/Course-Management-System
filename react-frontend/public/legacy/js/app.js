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
            moduleProgress: {},      // { [moduleId]: { theory } }
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
            return { theory: false };
        }
        return enrollment.moduleProgress[moduleId];
    }

    function isModuleComplete(part) {
        return !!(part && part.theory);
    }

    // Marks the reading of a module as complete and
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
            record.moduleProgress[moduleId] = { theory: false };
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

    var COURSE_LIBRARY = {
        "ai-1": [
            {title: "What Artificial Intelligence Really Is", text: "Artificial Intelligence is the branch of computer science that builds systems able to perform tasks which normally require human intelligence, such as understanding language, recognising patterns, making decisions and learning from experience. The field began in the 1950s, when researchers asked whether machines could think, and it has moved through several waves of optimism, disappointment and breakthrough since then.\n\nIt helps to separate three ideas that are often mixed up. Narrow AI solves one specific task very well, such as filtering spam or recommending a film. General AI, a system with human-level flexibility across any task, does not exist today. Between them sits the everyday reality of modern AI: powerful tools that are excellent inside their training domain and fragile outside it. Understanding these limits is the first step to using AI responsibly and realistically."},
            {title: "Intelligent Agents and Their Environments", text: "An intelligent agent is anything that perceives its environment through sensors and acts on it through actuators in order to achieve a goal. A thermostat, a chess program and a self-driving car are all agents, differing only in how rich their perception is and how sophisticated their decisions are. The agent view gives us a common language for describing every AI system.\n\nAgents are described by four elements: performance measure, environment, actuators and sensors. Environments can be fully or partially observable, deterministic or random, static or changing, and single-agent or multi-agent. A chess board is fully observable and deterministic, while real traffic is partially observable, random and shared with many other agents. The harder the environment, the more an agent needs memory, models of the world and the ability to learn rather than follow fixed rules."},
            {title: "Search and Problem Solving", text: "Many AI problems can be framed as search: starting from an initial state, apply actions to reach a goal state, ideally at the lowest cost. Route planning, puzzle solving and scheduling all fit this pattern. The set of every reachable state is called the state space, and a search algorithm decides in which order to explore it.\n\nUninformed methods such as breadth-first search and depth-first search explore blindly, while informed methods such as A-star use a heuristic, an estimate of the remaining distance to the goal, to focus effort on promising paths. A good heuristic never overestimates the true cost, which is what guarantees that A-star finds an optimal answer. The art of AI problem solving lies in choosing a clean state representation and a heuristic that cuts away huge parts of the space without losing the best solution."},
            {title: "Knowledge, Logic and Reasoning Under Uncertainty", text: "Early AI relied on symbolic knowledge: facts and rules written in a formal language so that a program could draw conclusions by logical inference. Expert systems for medical diagnosis and equipment repair were built this way, and they worked well when the domain was narrow and the rules were clear and complete.\n\nThe real world, however, is full of uncertainty, so modern systems combine logic with probability. Bayes theorem lets an agent update its belief in a hypothesis when new evidence arrives, and probabilistic graphical models describe how many uncertain variables influence each other. A diagnosis system, for example, does not claim a patient has a disease; it reports how likely each disease is given the symptoms observed. Reasoning with probabilities is what allows AI to behave sensibly with noisy sensors, missing data and ambiguous information."},
            {title: "Learning, Applications and Responsible AI", text: "Learning is what turned AI from a research topic into an everyday technology. Instead of being told every rule, a learning system improves from data. Supervised learning learns from labelled examples, unsupervised learning discovers structure in unlabelled data, and reinforcement learning learns by trial and reward. These three styles power translation, fraud detection, recommendation, medical imaging and countless other applications.\n\nWith that power comes responsibility. Models inherit the biases present in their training data, can be wrong with great confidence, and often cannot explain their decisions. Responsible AI means testing for fairness, protecting privacy, keeping humans in the loop for high-stakes decisions and being honest about what a system can and cannot do. A good practitioner asks not only whether a model can be built, but whether it should be, and who is affected when it fails."}
        ],
        "ai-2": [
            {title: "From Biological Neurons to Artificial Networks", text: "An artificial neural network is a computing model loosely inspired by the brain. The basic unit, the neuron or perceptron, takes several numerical inputs, multiplies each by a weight, adds a bias and passes the total through an activation function to produce an output. Learning means adjusting those weights so that the outputs become more accurate.\n\nA single neuron can only draw a straight dividing line, but stacking neurons into layers lets the network represent very complex patterns. The first layer receives the raw input, hidden layers transform it step by step into more useful features, and the output layer produces the prediction. The word deep in deep learning simply means that there are many hidden layers, allowing the network to build rich hierarchies of features automatically."},
            {title: "Activation Functions and Forward Propagation", text: "Forward propagation is the process of pushing an input through the network, layer by layer, until a prediction emerges. At each layer the network computes a weighted sum and then applies an activation function. Without activation functions, any number of layers would collapse into one linear equation, so it is the non-linearity that gives depth its power.\n\nCommon choices include ReLU, which outputs zero for negative values and the value itself otherwise, and is the default for hidden layers because it is fast and avoids vanishing signals. Sigmoid squeezes values between zero and one and suits binary probabilities, while softmax converts a layer into a probability distribution across many classes. Choosing the right activation for each layer, and the right one at the output, is a basic but essential design decision."},
            {title: "Loss Functions, Gradient Descent and Backpropagation", text: "To learn, a network needs a measure of how wrong it is. The loss function provides it: mean squared error for predicting numbers, and cross-entropy for predicting classes. Training is the search for weights that make this loss as small as possible across the training data.\n\nGradient descent does the searching. It calculates the slope of the loss with respect to every weight and moves each weight a small step downhill. Backpropagation is the efficient algorithm that computes all those slopes by applying the chain rule backwards from the output to the input. The size of each step is the learning rate: too large and training becomes unstable, too small and it crawls. Optimisers such as Adam adapt the step size automatically and are used in most modern projects."},
            {title: "Overfitting, Regularisation and Better Training", text: "A network with millions of parameters can memorise its training data instead of learning general patterns. This is overfitting, and it shows up as excellent training accuracy but poor accuracy on new data. Watching the gap between training and validation performance is the main way to detect it.\n\nSeveral techniques fight overfitting. Dropout randomly switches off neurons during training so the network cannot rely on any single path. Weight decay penalises very large weights, early stopping halts training when validation loss stops improving, and data augmentation creates new training examples by flipping, cropping or adding noise. Batch normalisation stabilises the signals between layers and speeds up learning. Together these tools turn a fragile network into a robust one."},
            {title: "Convolutional and Recurrent Architectures", text: "Different data calls for different architectures. Convolutional neural networks are designed for images: small filters slide across the picture detecting edges, then textures, then shapes, then whole objects, while sharing weights so that the network needs far fewer parameters. Pooling layers shrink the maps and make the result tolerant to small shifts.\n\nRecurrent neural networks process sequences such as text, speech and sensor streams by carrying a hidden state from one step to the next, giving them a memory. LSTM and GRU variants add gates that decide what to remember and what to forget, solving the problem of signals fading over long sequences. Today, attention based transformers have largely replaced recurrent models for language, but the idea of matching the architecture to the structure of the data remains central."}
        ],
        "ai-3": [
            {title: "Language, Text and the Challenge of Meaning", text: "Natural Language Processing teaches computers to read, interpret and generate human language. It is hard because language is ambiguous, context dependent and constantly changing. The word bank can mean a riverside or a financial institution, and the sentence I saw her duck has more than one meaning even before we consider tone or sarcasm.\n\nNLP powers search engines, translation, chatbots, voice assistants, sentiment analysis and document summarisation. Every one of these starts with the same question: how can raw characters be turned into numbers that a model can work with while preserving as much meaning as possible? The history of NLP is the history of better answers to that question, from hand written rules to statistics to neural networks."},
            {title: "Text Preprocessing and Tokenisation", text: "Before any model sees text, it must be cleaned and broken into pieces. Tokenisation splits a sentence into tokens, which may be words, sub-words or characters. Typical preprocessing steps include lowercasing, removing punctuation and stop words, and reducing words to their root using stemming or lemmatisation, so that running and ran are treated as forms of run.\n\nModern language models use sub-word tokenisers such as byte pair encoding, which handle rare and new words by splitting them into familiar fragments. The right amount of preprocessing depends on the task: sentiment analysis may need to keep punctuation and capitals because they carry emotion, while topic classification often benefits from removing noise. Good NLP engineers treat preprocessing as a design decision, not a ritual."},
            {title: "Representing Words: From Bag of Words to Embeddings", text: "The simplest representation is the bag of words, which counts how often each word appears and ignores order. TF-IDF improves on it by weighting words that are frequent in one document but rare overall, which highlights what makes a document distinctive. These methods are quick and surprisingly strong baselines, but they treat every word as unrelated to every other.\n\nWord embeddings such as Word2Vec and GloVe fix this by placing each word as a point in a dense vector space where similar meanings sit close together. The famous example is that the vector for king minus man plus woman lands near queen. Contextual embeddings from transformer models go further, giving the word bank a different vector in a sentence about rivers than in a sentence about loans."},
            {title: "Language Models and the Transformer", text: "A language model predicts the next token given the tokens before it. Early versions used n-gram counts, then recurrent networks, and today the transformer architecture dominates. Its key idea is self-attention: for every token, the model learns how much to focus on every other token in the sequence, capturing long range relationships and allowing massive parallel training.\n\nLarge pretrained models such as BERT and GPT are trained on enormous text collections to learn grammar, facts and reasoning patterns, and are then fine-tuned or prompted for specific tasks. BERT reads text in both directions and excels at understanding tasks like classification and question answering, while GPT style models generate text left to right. Pretraining followed by adaptation is now the standard recipe of NLP."},
            {title: "Core NLP Tasks, Evaluation and Ethics", text: "Common NLP tasks include text classification, named entity recognition, part of speech tagging, machine translation, summarisation and question answering. Each has its own metrics: accuracy, precision, recall and F1 for classification, BLEU or ROUGE for translation and summaries, and exact match for question answering. Choosing the right metric is as important as choosing the right model.\n\nLanguage systems also raise serious ethical questions. They can repeat stereotypes found in their training data, produce fluent but false statements, leak private information and be misused to generate misleading content. Responsible practitioners evaluate models on diverse data, document limitations, add safeguards and keep a human reviewing important outputs."}
        ],
        "ai-4": [
            {title: "How Computers See: Images as Data", text: "A digital image is a grid of pixels, and each pixel is a number, or three numbers for red, green and blue. Computer vision is the field that turns those grids of numbers into understanding: recognising objects, reading text, measuring distances and tracking motion. What looks effortless to a human eye is a genuinely hard problem for a machine, because the same object can appear under different lighting, angle, size and background.\n\nApplications are everywhere: face unlock on phones, quality inspection in factories, medical scan analysis, crop monitoring from drones, and the perception systems of autonomous vehicles. All of them start by converting pixels into useful features."},
            {title: "Classical Image Processing and Feature Detection", text: "Before deep learning, vision engineers hand crafted features. Filtering and convolution blur or sharpen an image, edge detectors such as Sobel and Canny find boundaries where brightness changes sharply, and thresholding separates objects from the background. Colour spaces like HSV make it easier to isolate a specific colour regardless of brightness.\n\nFeature descriptors such as SIFT and ORB find distinctive keypoints that can be matched between two photos, which is how panoramas are stitched and objects are tracked. These techniques are still valuable because they are fast, need no training data and are easy to explain, and they are often used to prepare images before a neural network sees them."},
            {title: "Convolutional Neural Networks for Image Classification", text: "Convolutional neural networks learn their own features. Early layers detect simple edges, middle layers combine them into textures and parts, and deep layers recognise complete objects. Convolution layers share small filters across the whole image, pooling layers reduce size, and fully connected layers at the end produce a class probability.\n\nLandmark architectures show the progress: AlexNet proved deep learning could win large scale competitions, VGG showed the value of depth, and ResNet introduced skip connections that allow very deep networks to train. In practice, most projects use transfer learning, starting from a model pretrained on millions of images and fine tuning it on a small custom dataset, which saves time and needs far less data."},
            {title: "Object Detection and Image Segmentation", text: "Classification says what is in a picture; detection says what and where. Detectors such as YOLO and Faster R-CNN draw a bounding box around every object and label it, which is essential for tasks like counting cars or spotting defects. They are judged by intersection over union, which measures how well a predicted box overlaps the true one.\n\nSegmentation goes further by labelling pixels. Semantic segmentation assigns every pixel a class such as road, person or sky, while instance segmentation separates individual objects of the same class. Architectures like U-Net are widely used in medical imaging to outline organs and tumours precisely. Choosing between classification, detection and segmentation depends on how much detail the application really needs."},
            {title: "Training Data, Evaluation and Deployment", text: "Vision models are only as good as their data. Datasets need careful labelling, balanced classes and variety in lighting, angles and backgrounds. Augmentation such as rotation, flipping, cropping and colour jitter multiplies the effective dataset and helps the model generalise, while a held out test set gives an honest estimate of real performance.\n\nDeployment brings new challenges: models must run fast on phones, cameras or edge devices, so they are compressed using quantisation and pruning. Real world monitoring is essential because the data changes over time. Finally, vision systems carry privacy and fairness concerns, especially for faces, so consent, transparency and testing across different groups are part of building a trustworthy product."}
        ],
        "ml-1": [
            {title: "What Machine Learning Is", text: "Machine learning is the practice of building programs that improve their performance by learning patterns from data instead of following rules written by hand. In traditional programming you supply rules and data and receive answers; in machine learning you supply data and answers and receive the rules, in the form of a trained model.\n\nThe three main families are supervised learning, where the data includes the correct answer for every example, unsupervised learning, where the model finds structure on its own, and reinforcement learning, where an agent learns from rewards. Most business applications, such as predicting house prices, detecting fraud or classifying emails, use supervised learning, so it is where this course concentrates first."},
            {title: "Data, Features and Labels", text: "Every machine learning project begins with data. A dataset is a table in which each row is an example and each column is a feature, a measurable property such as age, price or the number of words in a message. In supervised learning one special column, the label or target, holds the answer the model must learn to predict.\n\nReal data is messy. Missing values must be filled or removed, categories such as city names must be converted into numbers using encoding, and numeric columns on very different scales are normalised so that no single feature dominates. Time spent understanding and cleaning data usually exceeds the time spent training models, and it is the most reliable way to improve results."},
            {title: "The Training and Testing Workflow", text: "A model must be judged on data it has never seen, otherwise we only measure memory. The standard solution is to split the data into a training set, used to fit the model, a validation set, used to compare models and tune settings, and a test set, kept untouched until the very end for an honest final score.\n\nCross-validation repeats the split several times so that the result does not depend on one lucky or unlucky division. The workflow is always the same: prepare the data, choose a model, fit it on the training data, evaluate it on validation data, adjust, and finally report the test score. Following this discipline prevents the most common mistake in the field, which is leaking information from the test set into training."},
            {title: "Underfitting, Overfitting and the Bias-Variance Trade-off", text: "A model that is too simple cannot capture the real pattern and performs badly everywhere. This is underfitting, and it corresponds to high bias. A model that is too flexible memorises noise in the training set and performs badly on new data. This is overfitting, and it corresponds to high variance.\n\nThe goal is the middle ground. Learning curves, which plot training and validation error against dataset size or model complexity, reveal which problem you have. Underfitting is fixed with richer features or a more flexible model, while overfitting is fixed with more data, simpler models, regularisation or early stopping. Recognising which side of the trade-off you are on is the most practical skill in machine learning."},
            {title: "Your First Models: Linear Models, Trees and Neighbours", text: "Linear regression predicts a number as a weighted sum of features and is the simplest useful model. Logistic regression adapts the idea to predict the probability of a class. Both are fast, easy to interpret and often a strong baseline.\n\nDecision trees ask a series of yes or no questions about features and are easy to visualise, while random forests average many trees to give far more stable predictions. The k-nearest neighbours method classifies a point by the majority vote of its closest training examples. Starting with a simple baseline and only moving to complex models when the baseline proves insufficient is a habit that saves time and produces more trustworthy results."}
        ],
        "ml-2": [
            {title: "Framing Regression and Classification Problems", text: "Supervised problems fall into two groups. Regression predicts a continuous number, such as the price of a house or tomorrow's demand. Classification predicts a category, such as whether a transaction is fraudulent or which species a flower belongs to. Choosing the right framing is the first decision and determines which models and metrics apply.\n\nGood framing also means defining success in business terms. A model that predicts customer churn is only useful if the company can act on the prediction, so you need to know what a false alarm costs compared with a missed case. Spending time on the question before touching the data prevents building an accurate answer to the wrong problem."},
            {title: "Linear and Polynomial Regression in Depth", text: "Linear regression fits a line, or a plane in many dimensions, that minimises the sum of squared differences between predictions and actual values. The coefficients are directly interpretable: each one states how much the prediction changes when that feature rises by one unit while the others stay fixed.\n\nWhen the relationship is curved, polynomial features allow the same method to fit curves, but high degrees quickly overfit. Regularisation controls this. Ridge regression shrinks coefficients smoothly, while Lasso can shrink some to exactly zero, performing automatic feature selection. Residual plots, which show the errors against predictions, reveal whether the assumptions of the model are reasonable."},
            {title: "Logistic Regression, Trees and Ensembles", text: "Logistic regression passes a weighted sum through the sigmoid function to produce a probability between zero and one, and a threshold, commonly 0.5, converts it into a class. The threshold can be moved to favour catching more positives or avoiding false alarms, depending on the cost of each mistake.\n\nDecision trees handle non-linear patterns and mixed data naturally but overfit when grown deep. Ensembles solve this: random forests train many trees on random samples and average them, while gradient boosting builds trees one after another, each correcting the errors of the last. Libraries such as XGBoost and LightGBM make boosting one of the most successful methods for tabular data."},
            {title: "Evaluation Metrics That Match the Problem", text: "For regression, common metrics are mean absolute error, which is easy to explain in the original units, root mean squared error, which punishes large mistakes more, and R-squared, which shows the share of variation explained. For classification, accuracy can be misleading: a model that always predicts not fraud is 99 percent accurate when fraud is rare, yet completely useless.\n\nThe confusion matrix counts true and false positives and negatives. From it come precision, the share of predicted positives that were right, and recall, the share of real positives that were found. The F1 score balances the two, and the ROC curve and AUC show performance across all thresholds. Always choose the metric that reflects the real cost of errors."},
            {title: "Tuning, Pipelines and Handling Imbalanced Data", text: "Models have settings called hyperparameters, such as tree depth or regularisation strength, that are not learned from data. Grid search and random search try combinations and use cross-validation to pick the best, while more advanced tools search intelligently. Tuning on the validation set and reporting on a separate test set keeps the result honest.\n\nPipelines chain preprocessing and modelling into one object so that exactly the same steps run during training and prediction and no information leaks. When one class is rare, techniques such as class weights, oversampling the minority class with SMOTE, or undersampling the majority class help the model pay attention to it. Together these practices move a prototype toward a dependable model."}
        ],
        "ml-3": [
            {title: "The Reinforcement Learning Problem", text: "Reinforcement learning studies how an agent should act in an environment to maximise cumulative reward. Unlike supervised learning there is no teacher giving the right answer; the agent tries actions, observes the consequences and gradually learns which behaviour pays off. This is how programs have learned to play Go, control robots and manage data centre cooling.\n\nThe loop is simple. At each step the agent observes a state, chooses an action, receives a reward and moves to a new state. The difficulty is that rewards can be delayed, so a move that looks poor now might be essential for winning later, and the agent must learn to connect actions with far away consequences."},
            {title: "Markov Decision Processes and Value Functions", text: "The mathematical framework is the Markov decision process, defined by states, actions, transition probabilities, rewards and a discount factor. The Markov property says that the future depends only on the current state, not on how we arrived there. The discount factor, between zero and one, makes immediate rewards worth more than distant ones.\n\nA policy is the agent's strategy, a mapping from states to actions. The state value function measures how good it is to be in a state when following a policy, and the action value function, called Q, measures how good a specific action is in a state. The Bellman equation expresses each value in terms of the values of the next states, and almost every reinforcement learning algorithm is built on it."},
            {title: "Exploration, Exploitation and Q-Learning", text: "An agent faces a constant dilemma: exploit the best action it knows, or explore something new that might be better. The epsilon-greedy strategy handles it simply by choosing a random action with a small probability and the best known action otherwise, often reducing epsilon over time.\n\nQ-learning is a classic algorithm that stores a table of Q values and updates each entry after every step using the reward received plus the discounted best value of the next state. Because it learns about the best policy while behaving differently, it is called off-policy. With enough exploration the table converges to the optimal values, and acting greedily on it yields the optimal policy for small problems."},
            {title: "Deep Reinforcement Learning", text: "Tables become impossible when the state space is huge, such as the pixels of a video game. Deep Q-Networks replace the table with a neural network that estimates Q values from raw input. Two tricks make training stable: experience replay, which trains on random samples of past experience instead of consecutive correlated steps, and a target network, which changes slowly to give a steady learning target.\n\nPolicy gradient methods take another route and adjust the policy directly to make good actions more likely. Actor-critic methods combine both ideas, with an actor choosing actions and a critic judging them. Algorithms such as PPO are popular because they are reliable and relatively simple to tune, and they are widely used in robotics and game playing."},
            {title: "Reward Design, Challenges and Real Applications", text: "Agents optimise exactly what the reward measures, not what the designer intended. Poorly designed rewards lead to reward hacking, where the agent finds an unexpected shortcut that scores highly but defeats the purpose. Careful reward shaping and safety constraints are therefore as important as the algorithm itself.\n\nOther challenges include needing millions of trials, which is why training is usually done in simulation, difficulty transferring from simulation to reality, and sparse rewards that give little guidance. Real applications include recommendation, inventory and traffic control, robotics, resource scheduling and tuning large language models from human feedback. Success depends on clear goals, safe exploration and thorough testing."}
        ],
        "ml-4": [
            {title: "Why MLOps Exists", text: "Building a model in a notebook is only a small part of delivering value. MLOps applies the discipline of software engineering and DevOps to machine learning so that models can be built, deployed, monitored and updated reliably. Without it, projects stall between a promising prototype and a dependable product.\n\nMachine learning systems add problems that ordinary software does not have: the behaviour depends on data as well as code, performance quietly degrades as the world changes, and results must be reproducible. MLOps addresses these with version control for data and models, automated pipelines, systematic testing and continuous monitoring, giving teams a repeatable path from idea to production."},
            {title: "Reproducibility: Versioning Code, Data and Experiments", text: "To reproduce a result, you need the exact code, data, settings and environment that produced it. Git tracks code, while tools such as DVC track large datasets and models alongside it. Experiment trackers such as MLflow record every run with its parameters, metrics and artefacts so that results can be compared and the best one found again months later.\n\nEnvironments are captured with requirement files and containers, so a model trained on one machine behaves identically on another. Fixing random seeds, documenting data sources and storing the train and test split all contribute. Reproducibility is not paperwork; it is what makes debugging, auditing and collaboration possible."},
            {title: "Building Automated ML Pipelines", text: "A pipeline turns the manual steps of data ingestion, validation, feature creation, training, evaluation and registration into an automated, repeatable workflow. Orchestrators such as Airflow, Kubeflow or Prefect schedule and run the steps, retry failures and record what happened.\n\nTesting is built into the pipeline. Data validation checks catch missing columns or odd value ranges before they poison a model, unit tests cover feature code, and evaluation gates block a new model from release unless it beats the current one on agreed metrics. A model registry stores approved versions with their metadata so that deployment and rollback are controlled and traceable."},
            {title: "Deploying and Serving Models", text: "A model can be served in several ways. Batch prediction runs on a schedule and writes results to a database, which suits recommendations or nightly risk scores. Online serving exposes the model as an API that answers requests in milliseconds, and streaming or edge deployment places the model close to the data source.\n\nModels are usually packaged in containers and exposed through frameworks such as FastAPI, then scaled with Kubernetes. Safe release strategies reduce risk: shadow deployment runs the new model silently beside the old one, canary releases send a small share of traffic to it, and A/B tests measure real impact before full rollout. Always keep a quick path back to the previous version."},
            {title: "Monitoring, Drift and Continuous Improvement", text: "A deployed model starts ageing immediately. Data drift occurs when the inputs change, for example customers behave differently after a price change, and concept drift occurs when the relationship between inputs and outcome changes. Either one can silently reduce accuracy even though the service appears healthy.\n\nMonitoring therefore tracks system health such as latency and errors, data quality, input distributions, and prediction quality when true outcomes arrive. Alerts trigger investigation or automated retraining. Feeding fresh labelled data back into the pipeline closes the loop, and governance practices such as model documentation, access control and fairness checks keep the whole system accountable."}
        ],
        "data-science-1": [
            {title: "What Data Science Is and How a Project Flows", text: "Data science combines statistics, programming and domain knowledge to turn raw data into decisions. A typical project follows a cycle: define the question, collect the data, clean it, explore it, build a model or analysis, communicate the results and monitor the outcome. The most valuable skill is not any one tool but the ability to turn a vague business problem into a clear, answerable data question.\n\nRoles often overlap. Data analysts focus on reporting and insight, data engineers build the pipelines that deliver data, and machine learning engineers put models into production. A data scientist works across these areas, always with the aim of producing something that people can act on."},
            {title: "Python and Core Libraries for Data Work", text: "Python is the most popular language for data science because it is readable and has an enormous ecosystem. NumPy provides fast arrays and mathematical operations, pandas offers the DataFrame for working with tables, and Matplotlib and Seaborn create charts. Jupyter notebooks combine code, results and explanation in one document, which makes exploration and sharing easy.\n\nWith pandas you load a file, inspect its shape and types, select rows and columns, filter by conditions, group and aggregate, and join tables together. Learning to express these operations in a few clear lines, rather than loops, makes analysis faster and less error prone. Reading the documentation and practising on real datasets builds fluency quickly."},
            {title: "Collecting Data and Understanding Its Quality", text: "Data comes from files such as CSV and Excel, databases queried with SQL, web APIs, web scraping and sensors. Before analysing anything, understand how it was collected: who or what it represents, what time period it covers and what might be missing. Biased collection leads to biased conclusions, however sophisticated the analysis.\n\nQuality problems are common: duplicate rows, impossible values, inconsistent spelling, mixed units and missing entries. Profiling a dataset by checking counts, ranges, distributions and the share of missing values reveals these issues early. Documenting what you find, and what you decide to do about it, makes the work trustworthy and repeatable."},
            {title: "Cleaning and Preparing Data", text: "Cleaning usually takes most of a project's time. Missing values can be removed, filled with the mean or median, or predicted, and the right choice depends on why they are missing. Duplicates are dropped, text is standardised, dates are parsed into a proper type, and outliers are examined to decide whether they are errors or genuine rare events.\n\nPreparation also includes creating new features, such as extracting the month from a date or calculating a ratio, encoding categories as numbers and scaling numeric columns. Each step should be coded rather than done by hand in a spreadsheet, so the whole process can be rerun on new data and checked by someone else."},
            {title: "Summarising Data and Telling a First Story", text: "Descriptive statistics give the first picture: the mean and median describe the centre, the standard deviation and interquartile range describe the spread, and correlation measures how two variables move together. Grouping by category and comparing averages quickly surfaces differences worth investigating.\n\nA simple chart often communicates better than a table. Histograms show distributions, bar charts compare categories, line charts show trends and scatter plots show relationships. A good first report states the question, shows two or three clear findings with honest charts and notes the limitations. Remember that correlation does not prove causation, and always say how confident you are."}
        ],
        "data-science-2": [
            {title: "Probability and Distributions", text: "Probability measures how likely events are and is the foundation of statistics. Key ideas include independent events, conditional probability and Bayes theorem, which updates beliefs when new evidence appears. A random variable assigns numbers to outcomes, and its distribution describes how likely each value is.\n\nThe normal distribution, the familiar bell curve, appears everywhere because of the central limit theorem: averages of many independent observations tend to be normally distributed even when the data itself is not. The binomial distribution counts successes in repeated trials and the Poisson distribution counts events in a fixed interval. Knowing which distribution fits a situation guides which methods are valid."},
            {title: "Sampling and Estimation", text: "We rarely observe a whole population, so we study a sample and draw conclusions about the population. How the sample is chosen matters enormously: random sampling avoids bias, while convenience samples can mislead badly. Larger samples reduce random error but cannot fix bias.\n\nA point estimate, such as the sample mean, is a single best guess, and a confidence interval gives a range likely to contain the true value. A 95 percent interval means that if the procedure were repeated many times, about 95 percent of the intervals would cover the truth. Understanding this carefully prevents the common mistake of treating an interval as a statement about a single result."},
            {title: "Hypothesis Testing and p-values", text: "A hypothesis test asks whether an observed difference could plausibly be due to chance. We state a null hypothesis, usually that there is no effect, collect data and calculate a p-value, the probability of seeing a result at least this extreme if the null were true. A small p-value, commonly below 0.05, is evidence against the null.\n\nCommon tests include the t-test for comparing means, the chi-square test for categorical counts and ANOVA for comparing several groups. A p-value is not the probability that the hypothesis is true, and a significant result may be too small to matter in practice, so always report effect size alongside it. Beware of testing many hypotheses without adjustment, because some will appear significant by luck."},
            {title: "Regression and Relationships Between Variables", text: "Correlation measures the strength and direction of a linear relationship, while regression models it and allows prediction. Simple linear regression uses one predictor and multiple regression uses several, with each coefficient showing the effect of one variable while holding others constant. The R-squared value shows how much of the variation the model explains.\n\nGood analysis checks the assumptions: a roughly linear relationship, independent errors, constant spread of residuals and no extreme influence from single points. Multicollinearity, where predictors are strongly related to each other, makes coefficients unstable. Logistic regression extends the approach to yes or no outcomes, and the same careful interpretation applies."},
            {title: "Experiments, A/B Testing and Statistical Pitfalls", text: "The most reliable way to establish cause and effect is a controlled experiment. In an A/B test, users are randomly assigned to two versions, and a statistical test compares the outcome. Randomisation ensures that other factors are balanced between the groups, so a difference can be attributed to the change.\n\nPlan the sample size before starting using the expected effect and desired power, and do not stop the test early just because the result looks good. Common pitfalls include p-hacking, ignoring confounding variables, confusing statistical with practical significance and survivorship bias. Honest statistics means reporting everything you tried, uncertainty included, not only the result you hoped for."}
        ],
        "data-science-3": [
            {title: "Understanding Big Data and Its Challenges", text: "Big data describes datasets so large, fast or varied that traditional tools cannot handle them comfortably. It is often summarised by the three Vs: volume, the sheer amount; velocity, the speed at which it arrives; and variety, the mix of structured tables, text, images and logs. Veracity, the trustworthiness of the data, is sometimes added as a fourth.\n\nWhen data no longer fits on one machine, the solution is distributed computing: spread the data across many computers and process the pieces in parallel. This brings new problems of coordination, failure handling and moving data efficiently, which the tools in this course are designed to solve."},
            {title: "Distributed Storage and the Hadoop Ecosystem", text: "Hadoop popularised storing huge data across clusters of ordinary servers. The Hadoop Distributed File System splits files into blocks and keeps several copies on different machines, so the loss of one machine does not lose data. MapReduce processes the blocks in parallel by mapping each piece to partial results and reducing them into a final answer.\n\nThe wider ecosystem adds Hive for SQL style queries, HBase for fast key based access and YARN for sharing cluster resources. Today, much storage has moved to cloud object stores and data lakes, which hold raw data cheaply, while data warehouses hold cleaned, structured data for reporting. Choosing between them depends on how the data will be used."},
            {title: "Processing Data at Scale with Apache Spark", text: "Spark improved on MapReduce by keeping data in memory between steps, making iterative work such as machine learning dramatically faster. Its core abstraction is the DataFrame, a distributed table that you query with familiar operations or SQL, while Spark plans and distributes the work for you.\n\nSpark evaluates lazily: transformations such as filter and join only build a plan, and nothing runs until an action such as count or write requests a result. This lets the optimiser rearrange the work efficiently. Understanding partitions, shuffles and caching helps you write jobs that scale, since moving data between machines is usually the most expensive part."},
            {title: "Streaming Data and Real-Time Analytics", text: "Many applications cannot wait for a nightly batch job: fraud detection, live recommendations and monitoring need answers in seconds. Streaming systems process events as they arrive. Apache Kafka acts as a durable, high throughput log that carries events between producers and consumers, and engines such as Spark Structured Streaming or Flink compute on those events continuously.\n\nStreaming introduces concepts such as windows, which group events by time, and watermarks, which decide how long to wait for late data. Systems must also handle duplicates and failures correctly. The lambda and kappa architectures describe ways of combining batch and streaming so that results are both fast and accurate."},
            {title: "Designing Analytics Pipelines and Governing Data", text: "A good big data pipeline ingests data from sources, stores it in layers from raw to cleaned to curated, transforms it with scheduled jobs and serves it to analysts and applications. Choosing efficient formats such as Parquet, which stores data by column and compresses well, and partitioning data by date or key, can reduce cost and query time dramatically.\n\nWith large data comes responsibility. Governance covers data quality checks, lineage that records where data came from, access control, encryption and compliance with privacy laws. Cost is also a design factor, since cloud processing is billed by use. The best architects balance speed, accuracy, cost and trust."}
        ],
        "data-science-4": [
            {title: "Principles of Effective Data Visualisation", text: "A visualisation turns numbers into shapes the eye can compare quickly. Its purpose is to answer a question or reveal a pattern, not to decorate. Every chart should have a clear message, and everything that does not support it should be removed.\n\nHumans judge position and length more accurately than angle, area or colour, which is why bar and line charts are usually better than pie charts for comparison. Start bar charts at zero, label axes and units, and use a clear title that states the takeaway. Avoid clutter, unnecessary three dimensional effects and misleading scales. Honest charts earn trust, and trust is what makes data persuasive."},
            {title: "Choosing the Right Chart for Your Data", text: "The data and the question decide the chart. Use a line chart for change over time, a bar chart to compare categories, a histogram or box plot to show a distribution, a scatter plot for the relationship between two numbers and a heatmap for a matrix of values. Maps suit geographic data, and tables are better when exact values matter.\n\nWhen many categories exist, sort the bars and consider showing only the top few. To show parts of a whole, a stacked bar or a simple labelled bar often works better than a pie. Small multiples, a row of identical small charts for different groups, make comparisons easy without overloading a single plot."},
            {title: "Colour, Layout and Design Choices", text: "Colour should carry meaning. Use a sequential palette for values that go from low to high, a diverging palette when there is a meaningful midpoint, and distinct hues for separate categories, limiting them to a handful. Highlight the one series that matters in a strong colour and fade the rest to grey.\n\nAccessibility matters: around one in twelve men have some colour vision deficiency, so avoid relying on red versus green and check contrast. Good layout follows reading order, aligns elements, uses white space generously and keeps fonts consistent and legible. Annotating the chart directly with the key insight saves the reader from searching for it."},
            {title: "Building Dashboards with Business Intelligence Tools", text: "A dashboard brings the most important measures together on one screen so people can monitor a business and spot problems. Tools such as Power BI, Tableau and Looker connect to databases and spreadsheets, let you drag fields onto charts and update automatically as data changes.\n\nA good dashboard starts with its audience and their decisions. Put the key figures, called KPIs, at the top, support them with a few charts and add filters for date, region or product. Keep it focused rather than crowded, and define each metric clearly so that everyone reads it the same way. Data modelling, with clean tables and relationships behind the scenes, is what makes the visuals fast and correct."},
            {title: "Data Storytelling and Presenting Insights", text: "Insight only matters if it is understood and acted on. Data storytelling structures findings as a narrative: set the context, introduce the problem or question, show the evidence and end with a clear recommendation. Know your audience, because executives need the conclusion and the impact, while analysts want the method.\n\nLead with the answer, show one idea per slide or chart and guide attention with colour and annotation. Be honest about uncertainty and limitations, and anticipate questions. Review your work for ethics: ensure the visuals do not exaggerate, the data is used with permission and the story does not hide inconvenient facts. A clear, truthful story is the final step of every data project."}
        ],
        "cyber-security-1": [
            {title: "Understanding Cyber Security and the CIA Triad", text: "Cyber security is the practice of protecting systems, networks and data from attack, damage and unauthorised access. Its goals are summarised by the CIA triad. Confidentiality means information is seen only by those allowed to see it, integrity means it cannot be changed without detection, and availability means systems and data are accessible when needed.\n\nEvery security control supports at least one of these goals. Encryption protects confidentiality, hashing and digital signatures protect integrity, and backups and redundancy protect availability. Thinking in terms of the triad helps you decide what matters most for a given system: a hospital record needs all three, while a public website cares most about availability and integrity."},
            {title: "Common Threats and Attack Types", text: "Attackers use a wide range of methods. Malware includes viruses, worms, trojans, ransomware that locks files for payment, and spyware that steals information. Phishing tricks people into revealing passwords or running attachments, and social engineering exploits trust rather than technology. Denial of service attacks flood a system so legitimate users cannot reach it.\n\nOther attacks exploit weaknesses in software, such as SQL injection and cross-site scripting, intercept traffic in man-in-the-middle attacks or guess passwords by brute force. Insider threats come from people with legitimate access. Most breaches combine human error with a technical weakness, which is why both people and systems need protection."},
            {title: "Authentication, Passwords and Access Control", text: "Authentication proves who you are, and authorisation decides what you may do. Strong authentication combines something you know, such as a password, something you have, such as a phone or security key, and something you are, such as a fingerprint. Multi-factor authentication adds layers so that a stolen password alone is not enough.\n\nPasswords should be long, unique and kept in a password manager, and systems should store them only as salted hashes, never in plain text. Access control follows the principle of least privilege: give each user only the permissions needed for their job. Role-based access control groups permissions into roles, making them easier to manage and audit."},
            {title: "Network Security Fundamentals", text: "A network is a set of connected devices, and every connection is a potential entry point. Firewalls filter traffic according to rules, intrusion detection and prevention systems watch for suspicious patterns, and virtual private networks encrypt traffic across untrusted networks. Segmenting a network into zones limits how far an intruder can move.\n\nSecure protocols matter: HTTPS protects web traffic using TLS, and SSH replaces insecure remote access. Wireless networks should use modern encryption such as WPA3. Basic hygiene, including closing unused ports, keeping devices updated and monitoring logs, prevents a large share of real world incidents."},
            {title: "Security Hygiene, Awareness and Incident Basics", text: "Most successful attacks use known weaknesses, so regular patching and updates are among the most effective defences. Backups, tested and stored offline or separately, allow recovery from ransomware and accidents. Antivirus and endpoint protection add another layer, and encryption on laptops and phones protects data if a device is lost.\n\nPeople are part of the defence. Security awareness teaches users to spot phishing, verify unusual requests and report problems quickly. When an incident occurs, the basic steps are to identify it, contain the damage, remove the cause, recover and learn from it. A calm, practised response limits harm far more than improvisation."}
        ],
        "cyber-security-2": [
            {title: "Network Architecture and Attack Surfaces", text: "To defend a network you must understand it. The OSI and TCP/IP models describe how data moves from applications down to physical links, and each layer has its own weaknesses: ARP spoofing at the link layer, IP spoofing at the network layer, SYN floods at the transport layer and many attacks at the application layer.\n\nThe attack surface is the sum of all points where an attacker could try to get in, including open ports, exposed services, remote access and user accounts. Reducing it by switching off unused services, limiting exposure and mapping assets is the foundation of good network defence, because you cannot protect what you do not know you have."},
            {title: "Firewalls, IDS/IPS and Network Segmentation", text: "Firewalls enforce which traffic is allowed. Packet filters check addresses and ports, stateful firewalls track conversations, and next generation firewalls inspect applications and users. A default deny rule, allowing only what is explicitly needed, is the safest starting point.\n\nIntrusion detection systems watch traffic for signatures of known attacks or unusual behaviour and raise alerts, while intrusion prevention systems can block the traffic automatically. Segmentation divides the network into zones such as public servers in a demilitarised zone, internal users and sensitive databases, so a breach in one area does not spread everywhere. Zero trust goes further by verifying every request regardless of where it comes from."},
            {title: "Symmetric and Asymmetric Cryptography", text: "Cryptography protects data by transforming it with keys. Symmetric encryption, such as AES, uses the same key to lock and unlock data and is very fast, which makes it ideal for large volumes. Its difficulty is sharing the key safely.\n\nAsymmetric encryption, such as RSA and elliptic curve methods, uses a public key to encrypt and a private key to decrypt, solving the key sharing problem. It is slower, so real systems combine both: asymmetric methods exchange a temporary symmetric key, which then encrypts the session. Key length matters, and keys must be generated randomly, stored securely and rotated regularly, because the best algorithm fails if the key is exposed."},
            {title: "Hashing, Digital Signatures and Certificates", text: "A hash function turns any input into a fixed length fingerprint. Good hashes such as SHA-256 are one way, so the input cannot be recovered, and tiny changes in the input produce completely different outputs. Hashing verifies file integrity and, with salts and slow algorithms such as bcrypt, protects stored passwords.\n\nA digital signature encrypts a hash with a private key so that anyone with the public key can verify who signed a message and that it was not altered. Certificates issued by trusted certificate authorities bind a public key to an identity, which is how your browser knows it is talking to the real website. Together these provide authenticity, integrity and non-repudiation."},
            {title: "Secure Protocols, VPNs and Wireless Defence", text: "TLS secures web traffic by authenticating the server, agreeing on keys and encrypting the session, and it underlies HTTPS, secure email and many APIs. Disabling outdated versions and weak ciphers is an essential configuration task. SSH provides encrypted remote administration, and IPsec and WireGuard create virtual private networks that tunnel traffic safely across the internet.\n\nWireless networks need strong encryption with WPA3 or WPA2, unique passphrases and separation of guest traffic. Monitoring logs, using a security information and event management system to correlate alerts and testing defences regularly completes the picture. Defence in depth, many overlapping layers, ensures that no single failure leads to a breach."}
        ],
        "cyber-security-3": [
            {title: "The Ethics and Law of Ethical Hacking", text: "Ethical hackers use the same techniques as attackers, but with permission, to find weaknesses before criminals do. The permission is everything: testing without written authorisation is illegal, however good the intention. A proper engagement begins with a signed agreement defining the scope, the allowed methods, the timing and how findings will be reported.\n\nProfessional conduct includes protecting any data you encounter, avoiding damage to systems, reporting everything honestly and keeping the client's information confidential. Penetration testers follow structured methodologies such as PTES and the OWASP testing guide, so results are consistent, complete and useful to the people who must fix the problems."},
            {title: "Reconnaissance and Scanning", text: "Every test starts by learning about the target. Passive reconnaissance gathers public information without touching the target, such as domain records, search engines, job postings and social media. Active reconnaissance interacts with the systems to discover live hosts, open ports and running services, commonly with tools such as Nmap.\n\nService and version detection reveal which software is running, which can then be compared with databases of known vulnerabilities. Careful note taking is vital, because the quality of later stages depends on how well the map of the target was built. Scanning must also be controlled and agreed, since aggressive scans can disrupt fragile systems."},
            {title: "Vulnerability Analysis and Exploitation", text: "Vulnerability assessment identifies weaknesses such as missing patches, default credentials, misconfigurations and insecure services. Scanners automate part of this, but results include false positives that must be verified manually and ranked by real risk using scoring systems such as CVSS and the business context.\n\nExploitation then proves whether a weakness can actually be used, for example by gaining access through a vulnerable service or weak password. Frameworks such as Metasploit organise known exploits, but a good tester understands why an exploit works and chooses the least disruptive approach. The goal is evidence of impact, not damage, and every action is logged for the report."},
            {title: "Post-Exploitation, Privilege Escalation and Web Testing", text: "After gaining a foothold, a tester shows how far an attacker could go. Privilege escalation turns a low level account into administrator access by abusing misconfigurations, weak permissions or unpatched flaws. Lateral movement reaches other systems, and the tester documents which sensitive data could be reached, always within the agreed scope.\n\nWeb applications deserve special attention. Testers look for injection, broken authentication, insecure session handling, cross-site scripting and access control failures, using intercepting proxies such as Burp Suite to examine and modify requests. Cleaning up afterwards, removing tools and test accounts, leaves the client's systems as they were found."},
            {title: "Reporting, Remediation and Continuous Testing", text: "A penetration test is only valuable if the client can act on it. A strong report has an executive summary in plain language, a technical section with clear steps to reproduce each finding, evidence such as screenshots, a risk rating and specific recommendations for fixing every issue, ordered by priority.\n\nAfter remediation, a retest confirms that the fixes work. Mature organisations do not rely on a single annual test: they combine regular scanning, red team exercises that simulate real attackers, purple teaming where attackers and defenders collaborate, and bug bounty programmes. The aim is a steady reduction in risk, not a one off certificate."}
        ],
        "cyber-security-4": [
            {title: "Why Applications Are Targeted and the OWASP Top 10", text: "Applications hold valuable data and are exposed to the internet, which makes them a favourite target. Most breaches exploit mistakes in code or configuration rather than clever new techniques. The OWASP Top 10 is a widely used list of the most critical web application risks, including broken access control, cryptographic failures, injection, insecure design, security misconfiguration and vulnerable components.\n\nSecurity is far cheaper to build in than to bolt on later. Understanding common weaknesses lets developers recognise dangerous patterns while writing code, and gives testers a checklist of what to look for."},
            {title: "Input Validation and Injection Attacks", text: "Injection happens when untrusted input is treated as part of a command. In SQL injection, an attacker enters database commands into a form field and reads or changes data. The reliable defence is parameterised queries, which keep data separate from commands, combined with least privilege database accounts.\n\nThe same principle applies to operating system commands, LDAP and template engines. Validate input on the server using allow lists for type, length and format, never trusting checks made only in the browser. Encode output according to where it will be displayed, and never build commands by joining strings with user supplied values."},
            {title: "Authentication, Sessions and Access Control", text: "Weak authentication lets attackers take over accounts. Secure applications enforce strong password rules, hash passwords with algorithms such as bcrypt or Argon2, limit login attempts and offer multi-factor authentication. Sessions need random identifiers, secure cookie flags, sensible expiry and proper invalidation at logout.\n\nBroken access control is the most common serious flaw: a user changes an identifier in a web address and sees another person's data. Every request must be checked on the server for whether this user may perform this action on this object. Deny by default, centralise authorisation logic and test it with different roles."},
            {title: "Cross-Site Scripting, CSRF and Browser Defences", text: "Cross-site scripting occurs when an application includes untrusted data in a page without encoding it, allowing an attacker's script to run in the victim's browser and steal sessions or act on their behalf. Output encoding, templating frameworks that escape by default and a strict Content Security Policy are the main defences.\n\nCross-site request forgery tricks a logged in user's browser into sending an unwanted request, and is prevented with anti-forgery tokens and SameSite cookies. Additional headers such as HSTS, X-Content-Type-Options and frame restrictions harden the browser side, while CORS must be configured narrowly rather than allowing every origin."},
            {title: "Secure Development Lifecycle, APIs and Dependencies", text: "Security should be part of every stage of development: threat modelling during design, secure coding standards, code review, automated testing and monitoring in production. Static analysis scans source code, dynamic testing probes the running application, and dependency scanners find known vulnerabilities in third party libraries, which make up most of a modern application.\n\nAPIs need the same care: authenticate every call, authorise each object, limit request rates, validate schemas and avoid returning more data than necessary. Manage secrets such as keys and passwords outside the code, log security events without recording sensitive data, and keep a clear process for patching. Teams that automate these checks in their pipeline ship safer software faster."}
        ],
        "web-dev-1": [
            {title: "How the Web Works and the Structure of HTML", text: "When you type an address into a browser, it asks a server for a page using HTTP, and the server responds with files that the browser displays. The three core technologies divide the work: HTML provides the structure and content, CSS controls the appearance and JavaScript adds behaviour.\n\nAn HTML document is built from elements written with tags, such as headings, paragraphs, links, images, lists and tables. Semantic elements like header, nav, main, article and footer describe the meaning of each part, which helps search engines, screen readers and other developers. Forms collect user input with fields, labels and buttons, and well structured HTML is the foundation that everything else builds upon."},
            {title: "Styling Pages with CSS", text: "CSS selects elements and applies rules to them, setting colour, fonts, spacing and layout. Selectors can target tags, classes and identifiers, and the cascade and specificity rules decide which rule wins when several apply. Understanding the box model, where every element has content, padding, border and margin, explains most spacing puzzles.\n\nModern layout uses Flexbox for arranging items in one direction and Grid for two dimensional layouts. Custom properties store reusable values such as colours, and media queries adapt the design to different screen sizes. Keeping styles organised with consistent class names makes a site easier to maintain as it grows."},
            {title: "JavaScript Fundamentals", text: "JavaScript is the programming language of the browser. You declare variables with let and const, work with numbers, strings, booleans, arrays and objects, make decisions with conditions and repeat work with loops. Functions package reusable logic, and arrow functions give a short way to write them.\n\nArray methods such as map, filter and reduce transform collections clearly, and template strings build text easily. Understanding scope, how values are passed and how to read error messages in the browser console makes debugging far less painful. Practising with small programs, such as a calculator or a to-do list, builds confidence quickly."},
            {title: "The DOM and Handling Events", text: "The Document Object Model is the browser's live representation of the page as a tree of objects. JavaScript can select elements, read and change their text and attributes, add and remove elements and change their styles, which is how pages update without reloading.\n\nEvents connect user actions to code: clicks, key presses, form submissions and mouse movements all trigger listeners that you register. Event delegation, attaching one listener to a parent instead of many to children, keeps code efficient. Always validate form input and prevent the default submission when you handle it yourself, giving users clear feedback."},
            {title: "Fetching Data, Asynchronous Code and Developer Tools", text: "Many pages load data from servers after they appear. JavaScript runs one task at a time, so slow operations such as network requests are asynchronous: promises represent a result that will arrive later, and async and await let you write that code in a readable, step by step way. The fetch function requests data, usually JSON, which you then display on the page.\n\nHandle failures gracefully with try and catch and show loading and error states. The browser developer tools are your best friend: the console shows errors, the elements panel inspects and edits the page, and the network panel reveals every request. Using version control with Git and publishing your pages online completes your first project cycle."}
        ],
        "web-dev-2": [
            {title: "The Full Stack Architecture", text: "A full stack application has a front end, which runs in the browser, a back end, which runs on a server, and a database that stores data. The front end sends requests, the back end applies business rules, checks permissions and talks to the database, and the response travels back to be displayed. Understanding where each responsibility belongs keeps the application clean and secure.\n\nA typical modern stack combines React for the interface, Node.js with Express for the server and MongoDB or a SQL database for storage. The pieces communicate through HTTP APIs that exchange JSON, and each can be developed, tested and deployed independently."},
            {title: "Building the Back End with Node.js and Express", text: "Node.js lets JavaScript run on the server, and Express is a small framework for defining routes. A route pairs an HTTP method and a path, such as GET for reading and POST for creating, with a function that handles the request and sends a response. Middleware functions run in sequence on each request to parse bodies, log, authenticate and handle errors.\n\nA clean structure separates routes, controllers that hold the logic, services and models. Configuration such as ports and secrets lives in environment variables, not in code. Returning clear status codes and consistent error messages makes the API easy for the front end to use."},
            {title: "Databases and Data Modelling", text: "Applications need to store data permanently. Relational databases such as PostgreSQL organise data into tables with relationships and are queried with SQL, while document databases such as MongoDB store flexible JSON-like documents. The choice depends on the shape of the data and how it is queried.\n\nA tool such as Mongoose defines schemas and validation for MongoDB, and models provide methods to create, read, update and delete records. Good design uses indexes to speed up common queries, avoids duplicating data unnecessarily and plans how records relate, for example a student and their enrollments. Never trust input: validate it before it is saved."},
            {title: "Authentication and Authorisation", text: "Users must prove who they are before using protected features. A standard approach is to store a hashed password, check it at login and return a signed JSON Web Token that the client sends with later requests. The server verifies the signature and reads the user and role from the token.\n\nAuthorisation then decides what each role may do, for example that only an admin can edit courses. Implement it in middleware so the rules are enforced on the server for every request, because anything hidden only in the user interface can be bypassed. Use HTTPS, limit login attempts and keep secrets out of source control."},
            {title: "Connecting Front End and Back End, Then Deploying", text: "The React front end calls the back end with fetch or a library such as Axios, stores the token, shows loading and error states and updates the interface when data arrives. Cross-origin requests must be explicitly allowed on the server using CORS with a list of trusted origins.\n\nDeployment puts the application online: the front end can be hosted on a platform such as Vercel, the back end on a service such as Render and the database in a managed cloud such as MongoDB Atlas. Settings are provided as environment variables, and after each release you test the live site, check the logs and keep the process repeatable so that updates are routine."}
        ],
        "web-dev-3": [
            {title: "Principles of RESTful API Design", text: "An API is the contract that lets different programs talk to each other. REST organises it around resources, the things the system manages, each identified by a URL such as courses or students. The HTTP method states the action: GET reads, POST creates, PUT or PATCH updates and DELETE removes.\n\nGood design uses plural nouns for paths, meaningful status codes such as 200, 201, 400, 401, 404 and 500, and consistent JSON responses. Calls should be stateless, with each request carrying everything needed to process it. Pagination, filtering and sorting keep responses manageable, and a clear, predictable API is easier for others to learn and use."},
            {title: "Versioning, Validation and Documentation", text: "APIs change over time, and clients depend on them. Versioning, such as placing v1 in the path, lets you introduce changes without breaking existing users. Validate every incoming request against a schema, returning helpful messages that say what was wrong, and never expose internal error details.\n\nDocumentation is part of the product. The OpenAPI specification describes endpoints, parameters and responses in a machine readable format, and tools such as Swagger turn it into interactive pages. Testing with tools such as Postman and automated test suites makes sure that each endpoint behaves as documented after every change."},
            {title: "Securing APIs: Authentication, Rate Limiting and Safe Defaults", text: "APIs are exposed to the internet and must be protected. Authenticate callers using tokens, OAuth or API keys, and check authorisation for each resource, not just at login. Always use HTTPS, restrict cross-origin access, set security headers and validate and sanitise all input.\n\nRate limiting restricts how many requests a client may make in a period, protecting against abuse and accidental overload. Return only the data a client needs, hide internal identifiers where possible and log security events. Following the principle of least privilege for tokens and service accounts limits the damage if a credential is leaked."},
            {title: "From Monolith to Microservices", text: "A monolith packages all features into one application, which is simple to start with but can become hard to change and scale. Microservices split the system into small services, each owning one business capability and its own data, such as users, orders and payments. They can be developed, deployed and scaled independently and written in different technologies.\n\nThis flexibility has a cost: more moving parts, network failures and harder debugging. Teams should split along clear business boundaries rather than by technology, and often begin with a well structured monolith, extracting services when real needs appear. An API gateway provides a single entry point that routes requests, handles authentication and applies limits."},
            {title: "Communication, Resilience and Observability", text: "Services communicate synchronously through HTTP or gRPC calls, or asynchronously through message brokers such as RabbitMQ or Kafka, where events are published and consumers react later. Asynchronous messaging decouples services and absorbs spikes, but requires care to handle duplicates and ordering.\n\nIn a distributed system failures are normal, so services use timeouts, retries with backoff and circuit breakers that stop calling a failing dependency. Observability makes the system understandable: structured logs, metrics and distributed tracing that follows a request across services reveal where time is spent and where errors begin. Containers and orchestration make deployment of many services manageable."}
        ],
        "web-dev-4": [
            {title: "Design Thinking and Understanding Users", text: "Good interfaces start with people, not pixels. User research through interviews, surveys and observation reveals what users need, what frustrates them and how they work. Personas summarise typical users, and user journeys map the steps they take to reach a goal, highlighting where the experience can improve.\n\nUX describes the overall experience of using a product, while UI describes the visual and interactive elements. Designers define the problem, generate ideas, build prototypes and test them with real users, repeating the cycle. Testing early with simple sketches is far cheaper than fixing a finished product that nobody can use."},
            {title: "Visual Design: Typography, Colour and Spacing", text: "Visual hierarchy guides the eye to what matters most using size, weight, colour and position. Typography should be legible: choose a readable typeface, a comfortable size of at least sixteen pixels for body text, generous line height and a limited number of font styles.\n\nColour sets mood and meaning, so choose a small palette with a clear primary colour, neutral backgrounds and consistent use for actions and alerts. Ensure strong contrast between text and background. Consistent spacing, based on a regular scale and plenty of white space, makes a layout feel organised and calm. A design system records these decisions as reusable tokens and components."},
            {title: "Responsive Layout with Flexbox, Grid and Media Queries", text: "People use phones, tablets, laptops and large monitors, and a responsive site adapts to all of them. The mobile first approach designs the small screen first and adds complexity as space increases. The viewport meta tag, flexible units such as percentages and rem, and images that scale with their container are the foundation.\n\nFlexbox arranges items along a row or column and handles alignment and wrapping, while CSS Grid defines rows and columns for full page layouts. Media queries change the layout at chosen breakpoints, for example turning three columns into one on a narrow screen. Test on real devices and make touch targets large enough to tap comfortably."},
            {title: "Accessibility and Inclusive Design", text: "Accessible design ensures that people with visual, hearing, motor or cognitive differences can use a product, and it benefits everyone. The WCAG guidelines are organised around making content perceivable, operable, understandable and robust.\n\nPractical steps include using semantic HTML, providing alternative text for images, labelling form fields, ensuring everything works with a keyboard, keeping a visible focus indicator, not relying on colour alone and maintaining sufficient contrast. Captions help users who cannot hear media, and clear language helps everyone. Testing with a screen reader and automated tools reveals problems that are easy to miss."},
            {title: "Prototyping, Usability Testing and Handoff", text: "Prototypes let you test ideas before building them. Low fidelity wireframes focus on structure and flow, and high fidelity mockups in tools such as Figma show the final look and can be made clickable. Components and shared styles keep the design consistent and speed up changes.\n\nUsability testing watches real people attempt tasks and notes where they hesitate or fail; even five participants uncover most major issues. Analyse the results, prioritise fixes and test again. Finally, hand the design to developers with clear specifications, spacing, states and assets, and keep collaborating, because the best interfaces are refined continuously based on how people actually use them."}
        ],
        "cloud-1": [
            {title: "What Cloud Computing Is and Why It Matters", text: "Cloud computing delivers computing resources such as servers, storage, databases and software over the internet, paid for according to use. Instead of buying and maintaining hardware, organisations rent what they need from providers such as Amazon Web Services, Microsoft Azure and Google Cloud, and can start in minutes.\n\nThe main benefits are speed, because resources are available on demand, elasticity, because capacity grows and shrinks with need, cost efficiency, because you pay only for what you use, and global reach, because applications can run close to users around the world. The trade-off is shared responsibility and the need to manage cost and security carefully."},
            {title: "Service Models: IaaS, PaaS and SaaS", text: "Cloud services are offered at different levels of management. Infrastructure as a Service provides virtual machines, storage and networks that you configure yourself, giving the most control. Platform as a Service provides a ready environment to run your code, such as managed databases and application hosting, so you focus on the application. Software as a Service delivers a finished application such as email or a document editor through the browser.\n\nThe higher you go, the less you manage and the less you can customise. Choosing the right level is a trade-off between flexibility, effort and cost, and most real systems combine several."},
            {title: "Deployment Models and Global Infrastructure", text: "In a public cloud, resources are shared among many customers on the provider's infrastructure. A private cloud is dedicated to one organisation, and a hybrid cloud connects the two, keeping sensitive systems private while using the public cloud for flexibility. Some organisations also use several providers, called multi-cloud, to avoid dependence on one.\n\nProviders organise infrastructure into regions, which are geographic areas, and availability zones, which are separate data centres within a region. Deploying across zones keeps an application running if one fails, and choosing a region near users reduces delay and can satisfy data residency rules."},
            {title: "Core Services: Compute, Storage, Databases and Networking", text: "Compute services run your code: virtual machines for full control, containers for lightweight packaging and serverless functions that run only when triggered. Storage comes in forms for different needs, including object storage for files and backups, block storage for disks attached to machines and file storage shared between systems.\n\nManaged databases, relational and NoSQL, handle backups, patching and scaling. Networking services create isolated virtual networks, subnets, load balancers that spread traffic and content delivery networks that cache content near users. Knowing which service fits which need is the heart of cloud design."},
            {title: "Pricing, Cost Control and the Shared Responsibility Model", text: "Cloud pricing is usually pay as you go, with discounts for committing to long term use and cheaper spare capacity for work that can be interrupted. Costs can grow quickly if resources are left running, so teams use budgets, alerts, tags to attribute spending and regular reviews to remove waste and right size resources.\n\nSecurity follows the shared responsibility model: the provider secures the underlying infrastructure, while the customer secures what they put on it, including data, access, configuration and applications. Most cloud incidents come from customer misconfiguration, such as publicly exposed storage, so identity management and careful settings are essential."}
        ],
        "cloud-2": [
            {title: "DevOps Culture and the Delivery Lifecycle", text: "DevOps joins development and operations so that software is built, tested, released and run by teams who share responsibility. The goal is to deliver value quickly and reliably through small, frequent changes instead of rare, risky releases. Core values include collaboration, automation, measurement and continuous learning.\n\nThe lifecycle is a loop: plan, code, build, test, release, deploy, operate and monitor, with feedback from production informing the next plan. The DORA metrics, deployment frequency, lead time for changes, change failure rate and time to restore service, measure how well a team performs."},
            {title: "Version Control and Branching Strategies", text: "Version control with Git records every change, lets many people work together and makes it possible to return to any earlier state. Developers work on branches, then open a pull request so others can review the changes before they are merged. Review improves quality and shares knowledge.\n\nStrategies differ in how branches are used. Trunk based development merges small changes into the main branch often, supported by automated tests, while Gitflow uses longer lived feature and release branches. Whichever you choose, clear commit messages, protected main branches and a rule that nothing is merged without passing checks keep the codebase healthy."},
            {title: "Continuous Integration: Building and Testing Automatically", text: "Continuous integration means every change is automatically built and tested as soon as it is pushed. A pipeline defined in a file, using tools such as GitHub Actions, Jenkins or GitLab CI, checks out the code, installs dependencies, compiles, runs unit and integration tests, performs code quality and security scans and reports the result.\n\nFast, reliable tests are the key. The test pyramid recommends many quick unit tests, fewer integration tests and a small number of end to end tests. When a build fails, fixing it becomes the team's first priority. Artefacts such as packages or container images are produced once and stored in a registry so the same tested build is used everywhere."},
            {title: "Continuous Delivery and Deployment Strategies", text: "Continuous delivery keeps software always ready to release, and continuous deployment goes further by releasing every passing change automatically. The pipeline promotes a build through environments such as testing, staging and production, with automated checks and, where needed, human approval.\n\nSafe release strategies reduce risk. Rolling updates replace instances gradually, blue green deployment switches traffic between two identical environments, and canary releases send a small share of users to the new version first. Feature flags separate deployment from release, allowing features to be switched on for some users, and every release needs a quick rollback plan."},
            {title: "Infrastructure as Code and Monitoring", text: "Infrastructure as code describes servers, networks and services in files that are versioned, reviewed and applied automatically. Terraform creates cloud resources declaratively, while tools such as Ansible configure software on machines. This makes environments reproducible, removes manual drift and allows a full environment to be rebuilt in minutes.\n\nAfter release, monitoring closes the loop. Metrics, logs and traces show the health of the system, dashboards display them and alerts notify the team when thresholds are crossed. Defining service level objectives gives teams a shared target, and blameless postmortems after incidents turn failures into improvements."}
        ],
        "cloud-3": [
            {title: "Containers and Why Orchestration Is Needed", text: "A container packages an application with its dependencies so it runs the same everywhere. Unlike virtual machines, containers share the host's operating system kernel, making them small and quick to start. Images are built from a Dockerfile in layers and stored in registries.\n\nRunning a handful of containers is easy, but production systems may have hundreds across many machines. Someone must decide where each runs, restart those that fail, scale with demand, connect them and update them without downtime. This is the job of an orchestrator, and Kubernetes has become the standard one."},
            {title: "Kubernetes Architecture and Core Objects", text: "A Kubernetes cluster has a control plane that makes decisions, including the API server, scheduler and a store called etcd, and worker nodes that run the containers using the kubelet. You describe the desired state in YAML files, and controllers continuously work to make reality match it.\n\nThe smallest unit is a pod, one or more containers sharing network and storage. A Deployment manages a set of identical pods, handling replicas and rolling updates. Namespaces divide a cluster into logical areas, and labels and selectors connect objects together. Working with the kubectl command line tool lets you create, inspect and debug all of these."},
            {title: "Services, Networking and Ingress", text: "Pods are temporary and their addresses change, so a Service provides a stable name and address that balances traffic across the healthy pods behind it. ClusterIP exposes a service inside the cluster, NodePort opens a port on every node and LoadBalancer requests an external load balancer from the cloud provider.\n\nIngress routes external HTTP and HTTPS traffic to services based on hostnames and paths, and handles TLS certificates. Network policies restrict which pods may talk to each other, applying least privilege inside the cluster. DNS built into Kubernetes lets services find each other by name."},
            {title: "Configuration, Storage and Stateful Workloads", text: "Configuration should live outside images. ConfigMaps hold ordinary settings and Secrets hold sensitive values, both injected as environment variables or files. This lets the same image run in different environments.\n\nContainers lose their files when they restart, so persistent data uses volumes. PersistentVolumeClaims request storage without needing to know how it is provided. StatefulSets give pods stable identities and storage, which suits databases, though many teams prefer managed database services. Understanding the difference between stateless and stateful workloads is key to designing reliably."},
            {title: "Scaling, Health and Operating Clusters in Production", text: "Probes let Kubernetes know whether a container is healthy: liveness probes restart stuck containers and readiness probes keep traffic away until an app is ready. Resource requests and limits tell the scheduler how much CPU and memory a pod needs and protect neighbours from overuse.\n\nThe Horizontal Pod Autoscaler adds or removes pods based on load, and cluster autoscalers add nodes. Helm packages applications as reusable charts, and GitOps tools apply changes from a Git repository. Role based access control, resource quotas, monitoring with Prometheus and Grafana and careful upgrades keep clusters secure and dependable."}
        ],
        "cloud-4": [
            {title: "Cloud Security Principles and Shared Responsibility", text: "Security in the cloud begins with understanding who is responsible for what. The provider protects the physical facilities, hardware and core services, while the customer is responsible for their data, identities, configurations and applications. Even the best infrastructure cannot protect a storage bucket you accidentally make public.\n\nCore principles apply: defence in depth, least privilege, encryption everywhere, continuous monitoring and assuming that a breach may happen. Frameworks from providers and standards bodies describe best practices, and regular reviews of configuration catch drift before attackers do."},
            {title: "Identity and Access Management", text: "Identity is the new perimeter in the cloud. Every user, application and service should have its own identity with only the permissions it needs. Roles and policies define what actions are allowed on which resources, and temporary credentials are preferred over long lived keys.\n\nEnforce multi-factor authentication, especially for administrators, avoid using the root account for daily work and review permissions regularly to remove those no longer needed. Federated login connects the cloud to the organisation's identity provider so that access is granted and revoked in one place. Logging every sign in and action supports investigation."},
            {title: "Data Protection, Encryption and Key Management", text: "Data should be protected at rest, in transit and, where possible, in use. Encryption at rest uses keys managed by the provider or by the customer through a key management service, and TLS protects data moving between systems. Classify data by sensitivity so that the strongest controls apply where they matter most.\n\nKeys must be rotated, access to them tightly restricted and use of them logged. Secrets such as passwords and tokens belong in a dedicated secrets manager, not in code or configuration files. Backups, versioning and tested recovery plans protect against deletion, corruption and ransomware."},
            {title: "Network Security, Monitoring and Incident Response", text: "Cloud networks are built with virtual private clouds, subnets, security groups and firewalls. Place sensitive resources in private subnets, expose only what must be public and control traffic with narrow rules. Web application firewalls and DDoS protection defend public endpoints.\n\nCentralised logging and monitoring, using services that analyse activity logs and flag unusual behaviour, give visibility. Automated alerts and a prepared incident response plan, defining roles, containment steps and communication, shorten the time between detection and recovery. Regular drills make the plan real."},
            {title: "Compliance, Governance and Continuous Assurance", text: "Many organisations must comply with regulations and standards such as GDPR, HIPAA, PCI DSS, ISO 27001 and SOC 2, which set requirements for protecting data and proving it. Compliance is not the same as security, but it provides a structure and evidence that controls exist and work.\n\nGovernance in the cloud uses policies as code to prevent risky configurations automatically, tagging for ownership, separate accounts for different environments and audits that check settings continuously. Cloud security posture management tools scan for misconfigurations and rank them by risk. Treating compliance as an ongoing process, with documented evidence, keeps the organisation trustworthy."}
        ]
    };

    function fieldLabelSafe(fieldId) {
        if (window.EduTrackData && window.EduTrackData.fieldLabel) return window.EduTrackData.fieldLabel(fieldId);
        return fieldId;
    }

    function fallbackModules(course) {
        var skeleton = FIELD_MODULES[course.field] || FIELD_MODULES['web-dev'];
        return skeleton.map(function (skel) {
            return {
                title: skel.title,
                text: 'This section of ' + course.title + ' focuses on ' + skel.focus + '. ' +
                    'Guided by ' + (course.instructor || 'your instructor') + ', you will work through the underlying concepts step by step before connecting them to practical skills in ' +
                    fieldLabelSafe(course.field) + '.\n\n' +
                    'By the end of this module you should be able to explain the core idea in your own words, recognise it in a real project and avoid the most common mistakes learners make at this stage. ' +
                    'Take your time, and revisit this module whenever you need a refresher.'
            };
        });
    }

    function getDefaultCustomModules(course) {
        var list = COURSE_LIBRARY[course.id];
        if (list) {
            return list.map(function (m) { return { title: m.title, text: m.text }; });
        }
        return fallbackModules(course);
    }

    function getModules(course) {
        var custom = (course.modules || []).filter(function (m) {
            return m && typeof m.text === 'string' && m.text.trim();
        });
        var source = custom.length ? custom : getDefaultCustomModules(course);
        return source.map(function (m, i) {
            var title = (m.title && m.title.trim()) || ('Module ' + (i + 1));
            return {
                id: course.id + '-m' + (i + 1),
                index: i,
                title: 'Module ' + (i + 1) + ': ' + title,
                shortTitle: title,
                text: m.text.trim()
            };
        });
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
        if (localStorage.getItem('isAdminVerified') !== 'true' || sessionStorage.getItem('role') !== 'admin') {
            window.location.replace('admin-schema-login.html' + window.location.search);
        }
}

/* ---------- admin-dashboard ---------- */
EduTrack.pages['admin-dashboard'] = function () {
(function () {
            var CD = window.EduTrackData;
            var E = window.EduTrackEnrollments;

            // Logging out of the admin console must actually clear the
            // admin flag — otherwise it lingers in localStorage and the
            // browser is still treated as an authenticated admin later
            // (e.g. on edit-course.html) even after clicking "Logout".
            var adminLogoutBtn = document.getElementById('adminLogoutBtn');
            if (adminLogoutBtn) {
                adminLogoutBtn.addEventListener('click', function () {
                    localStorage.removeItem('isAdminVerified');
                });
            }

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
                document.getElementById('editContentBtn').textContent = courseId ? 'Edit Course Content' : 'Add Course Content';

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
            function collectCourseForm() {
                var id = document.getElementById('courseFormId').value;
                return {
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
            }

            document.getElementById('editContentBtn').addEventListener('click', function () {
                var form = document.getElementById('courseForm');
                if (!form.reportValidity()) return;
                var saved = CD.upsertCourse(collectCourseForm());
                if (saved && saved.id) {
                    window.location.href = 'edit-course.html?course=' + encodeURIComponent(saved.id);
                }
            });
            document.getElementById('courseFormOverlay').addEventListener('click', function (e) {
                if (e.target === this) closeCourseForm();
            });

            document.getElementById('courseForm').addEventListener('submit', function (e) {
                e.preventDefault();
                var course = collectCourseForm();
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

            var registeredStudents = null;

            function renderRegistered() {
                var body = document.getElementById('registeredPanelBody');
                if (registeredStudents === null) return;

                document.getElementById('countRegistered').textContent = registeredStudents.length + ' registered';
                document.getElementById('statStudents').textContent = registeredStudents.length;

                if (!registeredStudents.length) {
                    body.innerHTML = emptyState('No students have registered yet.');
                    return;
                }

                var enrollments = E.loadEnrollments();
                var rows = registeredStudents.map(function (st) {
                    var roll = String(st.rollNo || '').trim().toLowerCase();
                    var count = enrollments.filter(function (e) {
                        return String(e.rollNo || '').trim().toLowerCase() === roll;
                    }).length;
                    var joined = st.createdAt ? new Date(st.createdAt).toLocaleDateString('en-GB') : '';
                    return '<tr>' +
                        '<td><strong>' + escapeHtml(st.name) + '</strong></td>' +
                        '<td>' + escapeHtml(st.rollNo) + '</td>' +
                        '<td>' + escapeHtml(st.email) + '</td>' +
                        '<td>' + escapeHtml(st.department) + '</td>' +
                        '<td>' + count + '</td>' +
                        '<td>' + joined + '</td>' +
                    '</tr>';
                }).join('');

                body.innerHTML = '<div class="dash-table-wrap"><table class="dash-table">' +
                    '<thead><tr><th>Name</th><th>Roll No</th><th>Email</th><th>Department</th><th>Courses Enrolled</th><th>Registered On</th></tr></thead>' +
                    '<tbody>' + rows + '</tbody>' +
                '</table></div>';
            }

            function loadRegistered() {
                var base = (window.EduTrackServer && window.EduTrackServer.baseUrl) || 'http://localhost:5000/api/v1';
                fetch(base + '/students', {
                    headers: { 'Authorization': 'Bearer ' + sessionStorage.getItem('token') }
                }).then(function (response) {
                    return response.json().catch(function () { return {}; }).then(function (data) {
                        if (!response.ok) throw new Error(data.message || 'Unable to load students');
                        return data;
                    });
                }).then(function (data) {
                    registeredStudents = data.students || [];
                    renderRegistered();
                }).catch(function (err) {
                    document.getElementById('registeredPanelBody').innerHTML = emptyState('Could not load registered students: ' + escapeHtml(err.message));
                });
            }

            function renderAll() {
                renderCurriculum();
                renderEnrollments();
                renderRegistered();
                renderAnalytics();
            }

            renderAll();
            loadRegistered();

            // Keep the admin view live: if a student enrolls or completes
            // a module in another tab, refresh automatically.
            window.addEventListener('storage', function (e) {
                if (e.key === 'edutrack_enrollments' || e.key === 'edutrack_courses') {
                    renderAll();
                }
            });
        })();
};

/* ---------- admin sign-in against the real API ---------- */
EduTrack.adminSignIn = function (email, password, redirectTo) {
    var base = (window.EduTrackServer && window.EduTrackServer.baseUrl) || 'http://localhost:5000/api/v1';
    fetch(base + '/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password })
    }).then(function (response) {
        return response.json().catch(function () { return {}; }).then(function (data) {
            return { ok: response.ok, data: data };
        });
    }).then(function (result) {
        if (!result.ok || !result.data.token || !result.data.student || result.data.student.role !== 'admin') {
            alert('Invalid Security Tokens. Elevated access structure rejected.');
            return;
        }
        localStorage.removeItem('edutrack_current_student');
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('role', 'admin');
        localStorage.setItem('isAdminVerified', 'true');
        window.location.href = redirectTo;
    }).catch(function () {
        alert('Cannot reach the backend. Start it with "npm run dev" in the backend folder.');
    });
};

/* ---------- admin-login ---------- */
EduTrack.pages['admin-login'] = function () {
document.getElementById('adminLoginForm').addEventListener('submit', function (event) {
            event.preventDefault();

            var email = document.getElementById('email').value;
            var pass = document.getElementById('password').value;

            EduTrack.adminSignIn(email, pass, "admin-dashboard.html");
        });
};

/* ---------- admin-schema-login ---------- */
EduTrack.pages['admin-schema-login'] = function () {
var schemaTarget = 'edit-course.html' + window.location.search;
if (localStorage.getItem('isAdminVerified') === 'true' && sessionStorage.getItem('role') === 'admin' && sessionStorage.getItem('token')) {
    window.location.replace(schemaTarget);
    return;
}
document.getElementById('adminLoginForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('admin-email').value;
            const pass = document.getElementById('admin-pass').value;

            EduTrack.adminSignIn(email, pass, schemaTarget);
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

            function drawCertificate(doc, info) {
                var W = doc.internal.pageSize.getWidth();
                var H = doc.internal.pageSize.getHeight();

                function mix(a, b, t) {
                    return [
                        Math.round(a[0] + (b[0] - a[0]) * t),
                        Math.round(a[1] + (b[1] - a[1]) * t),
                        Math.round(a[2] + (b[2] - a[2]) * t)
                    ];
                }

                function fill(c) {
                    doc.setFillColor(c[0], c[1], c[2]);
                }

                function text(c) {
                    doc.setTextColor(c[0], c[1], c[2]);
                }

                var green = [27, 84, 46];
                var goldDark = [140, 104, 36];
                var goldMid = [201, 162, 74];
                var goldLight = [244, 222, 148];
                var ink = [48, 48, 52];
                var grey = [110, 112, 118];

                fill([244, 245, 247]);
                doc.rect(0, 0, W, H, 'F');

                var x;
                for (x = 230; x < W; x += 2) {
                    var t = (x - 230) / (W - 230);
                    fill(mix([250, 251, 252], [226, 229, 233], Math.sin(t * Math.PI)));
                    doc.rect(x, 0, 2.5, H, 'F');
                }

                var panelW = 216;
                var cell = 54;
                var seed = 7;
                function rand() {
                    seed = (seed * 9301 + 49297) % 233280;
                    return seed / 233280;
                }
                var dark = [10, 58, 28];
                var light = [58, 140, 70];
                var row;
                var col;
                for (row = 0; row * cell < H + cell; row++) {
                    for (col = 0; col * cell < panelW; col++) {
                        var x0 = col * cell;
                        var y0 = row * cell;
                        var jitter = 0;
                        fill(mix(dark, light, Math.min(1, Math.max(0, rand() * 0.9))));
                        doc.triangle(x0, y0, x0 + cell, y0, x0, y0 + cell + jitter, 'F');
                        fill(mix(dark, light, Math.min(1, Math.max(0, rand() * 0.9))));
                        doc.triangle(x0 + cell, y0, x0 + cell, y0 + cell + jitter, x0, y0 + cell + jitter, 'F');
                    }
                }

                function ribbon(x1, width) {
                    var i;
                    for (i = 0; i < width; i += 1) {
                        var p = i / width;
                        var c = p < 0.5
                            ? mix(goldDark, goldLight, p * 2)
                            : mix(goldLight, goldDark, (p - 0.5) * 2);
                        fill(c);
                        doc.rect(x1 + i, 0, 1.4, H, 'F');
                    }
                }

                ribbon(176, 34);
                ribbon(216, 34);

                var cx = 213;
                var cy = 262;
                var points = 40;
                var star = [];
                var k;
                for (k = 0; k < points * 2; k++) {
                    var rad = k % 2 === 0 ? 70 : 62;
                    var ang = (Math.PI * k) / points;
                    star.push([cx + rad * Math.cos(ang), cy + rad * Math.sin(ang)]);
                }
                var segs = [];
                for (k = 1; k < star.length; k++) {
                    segs.push([star[k][0] - star[k - 1][0], star[k][1] - star[k - 1][1]]);
                }
                fill([22, 104, 48]);
                doc.lines(segs, star[0][0], star[0][1], [1, 1], 'F', true);

                var r;
                for (r = 58; r > 0; r -= 1) {
                    fill(mix(goldLight, goldDark, Math.pow(r / 58, 1.4)));
                    doc.circle(cx, cy, r, 'F');
                }
                for (r = 52; r > 0; r -= 1) {
                    fill(mix(goldDark, goldLight, Math.pow(r / 52, 1.6)));
                    doc.circle(cx - 3, cy - 3, r * 0.92, 'F');
                }
                doc.setDrawColor(goldDark[0], goldDark[1], goldDark[2]);
                doc.setLineWidth(1.2);
                doc.circle(cx, cy, 45, 'S');
                doc.setLineWidth(0.6);
                doc.circle(cx, cy, 36, 'S');

                for (k = 0; k < 28; k++) {
                    var da = (Math.PI * 2 * k) / 28;
                    fill(goldDark);
                    doc.circle(cx + 40.5 * Math.cos(da), cy + 40.5 * Math.sin(da), 1.1, 'F');
                }

                text(goldDark);
                doc.setFont('times', 'bold');
                doc.setFontSize(28);
                doc.text('ET', cx, cy + 4, { align: 'center' });
                doc.setFontSize(7.5);
                doc.text('EDUTRACK', cx, cy + 18, { align: 'center', charSpace: 1.2 });

                doc.setDrawColor(goldMid[0], goldMid[1], goldMid[2]);
                doc.setLineWidth(1.4);
                doc.rect(10, 10, W - 20, H - 20, 'S');

                var mid = 548;

                text(green);
                doc.setFont('times', 'bold');
                doc.setFontSize(22);
                doc.text('EduTrack', W - 52, 56, { align: 'right' });
                fill(goldMid);
                doc.circle(W - 46, 56, 2.6, 'F');

                text(green);
                doc.setFont('times', 'bold');
                doc.setFontSize(50);
                doc.text('CERTIFICATE', mid, 150, { align: 'center', charSpace: 4 });

                text(goldDark);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(15);
                doc.text('OF ' + info.kind, mid, 180, { align: 'center', charSpace: 6 });

                text(grey);
                doc.setFontSize(8.5);
                doc.text('THIS CERTIFICATE IS PROUDLY PRESENTED TO', mid, 218, { align: 'center', charSpace: 1 });

                text(ink);
                doc.setFont('times', 'bolditalic');
                var nameSize = 44;
                doc.setFontSize(nameSize);
                while (doc.getTextWidth(info.name) > 470 && nameSize > 20) {
                    nameSize -= 2;
                    doc.setFontSize(nameSize);
                }
                doc.text(info.name, mid, 266, { align: 'center' });

                doc.setDrawColor(150, 152, 158);
                doc.setLineWidth(0.8);
                doc.line(mid - 250, 280, mid + 250, 280);

                text(grey);
                doc.setFont('times', 'italic');
                doc.setFontSize(13);
                doc.text('for successfully completing all modules of the course', mid, 312, { align: 'center' });

                text(green);
                doc.setFont('times', 'bold');
                var courseSize = 26;
                doc.setFontSize(courseSize);
                while (doc.getTextWidth(info.course) > 480 && courseSize > 14) {
                    courseSize -= 1;
                    doc.setFontSize(courseSize);
                }
                doc.text(info.course, mid, 346, { align: 'center' });

                text(grey);
                doc.setFont('times', 'italic');
                doc.setFontSize(12);
                doc.text('offered by EduTrack, in recognition of dedication, effort and commitment to learning.', mid, 374, { align: 'center' });

                var baseY = 470;

                text(ink);
                doc.setFont('times', 'normal');
                doc.setFontSize(15);
                doc.text(info.date, 400, baseY - 6, { align: 'center' });
                doc.setDrawColor(120, 122, 128);
                doc.setLineWidth(0.8);
                doc.line(310, baseY, 490, baseY);
                text(grey);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8.5);
                doc.text('DATE OF COMPLETION', 400, baseY + 15, { align: 'center', charSpace: 1 });

                text([26, 48, 104]);
                doc.setFont('times', 'bolditalic');
                var signSize = 26;
                doc.setFontSize(signSize);
                while (doc.getTextWidth(info.instructor) > 190 && signSize > 12) {
                    signSize -= 1;
                    doc.setFontSize(signSize);
                }
                doc.text(info.instructor, 690, baseY - 8, { align: 'center', angle: 0 });
                doc.setDrawColor(120, 122, 128);
                doc.line(590, baseY, 790, baseY);
                text(ink);
                doc.setFont('times', 'bold');
                doc.setFontSize(11);
                doc.text(info.instructor, 690, baseY + 14, { align: 'center' });
                text(grey);
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(8.5);
                doc.text('COURSE INSTRUCTOR', 690, baseY + 28, { align: 'center', charSpace: 1 });
            }

            function downloadCertificate(enrollment) {
                if (!window.jspdf || !window.jspdf.jsPDF) {
                    window.alert('Certificate generator failed to load.');
                    return;
                }

                var studentName = enrollment.studentName || (student && student.studentName) || 'Student';
                var dateStr = new Date(enrollment.completedAt || Date.now()).toLocaleDateString('en-GB', {
                    year: 'numeric', month: 'long', day: 'numeric'
                });

                var doc = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });

                drawCertificate(doc, {
                    kind: 'COMPLETION',
                    name: studentName,
                    course: course.title,
                    instructor: course.instructor || 'Course Instructor',
                    date: dateStr
                });

                doc.save((course.title + ' Certificate').replace(/[^a-z0-9]+/gi, '_') + '.pdf');
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

            function escapeText(str) {
                var div = document.createElement('div');
                div.textContent = str == null ? '' : String(str);
                return div.innerHTML;
            }

            function paragraphsHTML(text) {
                return String(text).split(/\n{2,}/).map(function (para) {
                    return '<p>' + escapeText(para.trim()).replace(/\n/g, '<br>') + '</p>';
                }).join('');
            }

            function renderModules() {
                var enrollment = (student && student.rollNo) ? E.getEnrollment(student.rollNo, course.id) : null;
                document.getElementById('enrollBanner').style.display = enrollment ? 'none' : 'block';
                renderActionCard(enrollment);
                updateProgressUI(enrollment);

                modulesContainer.innerHTML = '';
                var unreadBoxes = [];

                modules.forEach(function (m, mIndex) {
                    var part = enrollment && enrollment.moduleProgress ? (enrollment.moduleProgress[m.id] || { theory: false }) : { theory: false };
                    var done = !!part.theory;

                    var card = document.createElement('div');
                    card.className = 'module-card' + (done ? ' is-complete' : '');
                    card.setAttribute('data-module-id', m.id);

                    card.innerHTML =
                        '<div class="module-card-header">' +
                            '<span class="module-number">Module ' + (mIndex + 1) + ' of ' + totalModules + '</span>' +
                            '<span class="module-status ' + (done ? 'completed' : 'not-started') + '">' + (done ? 'Completed' : 'Not Completed') + '</span>' +
                        '</div>' +
                        '<h4>' + escapeText(m.shortTitle) + '</h4>' +
                        '<div class="theory-box' + (done ? ' scrolled-end' : '') + '" data-theory-module="' + m.id + '" tabindex="0">' + paragraphsHTML(m.text) + '</div>' +
                        '<span class="' + (done ? 'viewed-tag' : 'pending-tag') + '">' + (done ? '&#10003; Completed' : 'Scroll to the end of the text to complete this module') + '</span>';

                    modulesContainer.appendChild(card);

                    var theoryBox = card.querySelector('[data-theory-module="' + m.id + '"]');
                    if (enrollment && !done) {
                        unreadBoxes.push({ box: theoryBox, id: m.id });
                        theoryBox.addEventListener('scroll', function () {
                            var reachedEnd = theoryBox.scrollTop + theoryBox.clientHeight >= theoryBox.scrollHeight - 8;
                            if (reachedEnd) {
                                markAndRefresh(m.id);
                            }
                        });
                    }

                    if (!enrollment) {
                        card.style.opacity = '0.6';
                        card.style.pointerEvents = 'none';
                    }
                });

                setTimeout(function () {
                    var fitting = unreadBoxes.filter(function (item) {
                        return item.box.isConnected && item.box.scrollHeight <= item.box.clientHeight + 8;
                    });
                    if (!fitting.length) return;
                    fitting.forEach(function (item) {
                        E.markPartViewed(student.rollNo, course.id, item.id, 'theory', totalModules);
                    });
                    renderModules();
                }, 0);
            }

            function markAndRefresh(moduleId) {
                if (!student || !student.rollNo) return;
                E.markPartViewed(student.rollNo, course.id, moduleId, 'theory', totalModules);
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
                var E = window.EduTrackEnrollments;
                var student = E && E.getCurrentStudent && E.getCurrentStudent();
                var enrollment = (student && student.rollNo) ? E.getEnrollment(student.rollNo, course.id) : null;
                var isAdmin = localStorage.getItem('isAdminVerified') === 'true' && sessionStorage.getItem('role') === 'admin';
                var courseLink = 'course.html?course=' + encodeURIComponent(course.id);

                var actionHTML;
                if (isAdmin) {
                    actionHTML = '<a href="edit-course.html?course=' + encodeURIComponent(course.id) + '" class="btn btn-edit">Edit Schema</a>';
                } else if (enrollment && enrollment.status === 'completed') {
                    actionHTML = '<a href="' + courseLink + '" class="btn btn-completed">Completed</a>';
                } else if (enrollment) {
                    actionHTML = '<a href="' + courseLink + '" class="btn btn-primary btn-start-learning">Start Learning</a>';
                } else {
                    actionHTML = '<a href="stu-login-enroll.html?course=' + encodeURIComponent(course.id) + '&title=' + encodeURIComponent(course.title) + '&field=' + encodeURIComponent(course.field) + '" class="btn btn-primary btn-enroll">Enroll</a>';
                }

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
                            actionHTML +
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
                return { title: 'Module ' + (index + 1), text: '' };
            }

            function escapeAttr(str) {
                return (str == null ? '' : String(str)).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
            }

            function escapeTextarea(str) {
                return (str == null ? '' : String(str)).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            }

            function moduleCardHTML(m, index) {
                return '' +
                    '<div class="module-editor-card">' +
                        '<div class="module-editor-header">' +
                            '<strong>Module ' + (index + 1) + '</strong>' +
                            '<button type="button" class="btn-remove-module" data-index="' + index + '">Remove</button>' +
                        '</div>' +
                        '<div class="field">' +
                            '<label>Module Title</label>' +
                            '<input type="text" class="mod-title" value="' + escapeAttr(m.title) + '" placeholder="e.g. Foundations & Problem Framing">' +
                        '</div>' +
                        '<div class="field">' +
                            '<label>Module Text</label>' +
                            '<textarea class="mod-text" rows="12" placeholder="Write the content students will read for this module. Leave a blank line between paragraphs.">' + escapeTextarea(m.text) + '</textarea>' +
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

            function syncModulesFromDom() {
                var cards = els.modulesEditor.querySelectorAll('.module-editor-card');
                currentModules = Array.prototype.map.call(cards, function (card) {
                    return {
                        title: card.querySelector('.mod-title').value.trim(),
                        text: card.querySelector('.mod-text').value.trim()
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

                var storedModules = (course.modules || []).filter(function (m) { return m && typeof m.text === 'string' && m.text.trim(); });
                currentModules = storedModules.length
                    ? storedModules.map(function (m) { return { title: m.title || '', text: m.text }; })
                    : Content.getDefaultCustomModules(course);
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

                currentModules = [blankModule(0), blankModule(1), blankModule(2), blankModule(3), blankModule(4)];
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
                    modules: currentModules.filter(function (m) { return m.text; })
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

            var requestedCourse = new URLSearchParams(window.location.search).get('course');
            if (requestedCourse && data.loadCourses().some(function (c) { return String(c.id) === requestedCourse; })) {
                loadCourseIntoForm(requestedCourse);
            }
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

/* ---------- student-login ----------
   Superseded by the ES module at js/pages/student-login.js, which
   student-login.html now loads directly (see auth.js / api.js / ui.js /
   validation.js). Left out of EduTrack.pages intentionally so app.js
   doesn't double-handle the form on that page. */

/* ============================== Dispatcher ============================== */
document.addEventListener('DOMContentLoaded', function () {
    var init = EduTrack.pages[EduTrack.currentPage];
    if (typeof init === 'function') {
        init();
    }
});