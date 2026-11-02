# Database Schema

Database: MongoDB (Mongoose), database name `edutrack`.

## Relationships

```
                        +-----------------+
                        |      User       |
                        | _id, name,      |
                        | email (unique), |
                        | passwordHash,   |
                        | role, rollNo    |
                        +--------+--------+
                                 |
        +------------+-----------+-----------+--------------+
        |            |                       |              |
        | 1..n       | 1..n                  | 1..n         | 1..n
+-------v------+ +---v-------------+  +------v-------+ +----v------------+
|  Enrollment  | | LearningProgress|  |   Message    | |  Notification   |
| student  --> | | student      -->|  | sender    -->|User| recipient --> |User
| course   --> | | course       -->|  | recipient -->|User| message,isRead|
| status       | | completedLessons|  | text         | +-----------------+
| enrolledAt   | | totalLessons    |  +--------------+
+------+-------+ | progressPercent |
       |         +--------+--------+
       | n..1             | n..1
       +--------+---------+
                |
        +-------v--------+
        |     Course     |
        | _id (string),  |
        | title, field,  |
        | badge, duration|
        | instructor,    |
        | mode, modules  |
        +----------------+
```

One user has many enrollments, progress records, sent messages, received messages and notifications.
One course has many enrollments and progress records.
A student can have only one enrollment and one progress record per course (unique compound indexes).

## Collections

### users
| Field | Type | Constraints |
|---|---|---|
| _id | ObjectId | generated |
| name | String | required, trimmed |
| email | String | required, unique, lowercase, trimmed |
| passwordHash | String | required, bcrypt hash (12 rounds) |
| department | String | optional |
| rollNo | String | optional |
| role | String | `student` or `admin`, default `student` |
| createdAt, updatedAt | Date | automatic |

Unique index: `email`.

### courses
| Field | Type | Constraints |
|---|---|---|
| _id | String | required, for example `ai-1` |
| title | String | required |
| field, badge, duration, description, instructor, mode, certificate | String | course details |
| modules | Array | course modules |

### enrollments
| Field | Type | Constraints |
|---|---|---|
| student | ObjectId (ref User) | required |
| course | String (ref Course) | required |
| status | String | `active`, `completed` or `withdrawn`, default `active` |
| enrolledAt | Date | default now |
| createdAt, updatedAt | Date | automatic |

Unique index: `{ student, course }`.
Unenrolling sets `status` to `withdrawn` so history is kept; enrolling again sets it back to `active`.

### learningprogresses
| Field | Type | Constraints |
|---|---|---|
| student | ObjectId (ref User) | required |
| course | String (ref Course) | required |
| completedLessons | Number | default 0, minimum 0 |
| totalLessons | Number | required, minimum 1 |
| progressPercentage | Number | 0 to 100, calculated before save |
| lastAccessedAt | Date | default now |

Unique index: `{ student, course }`.

### notifications
| Field | Type | Constraints |
|---|---|---|
| recipient | ObjectId (ref User) | required |
| message | String | required, maximum 500 characters |
| isRead | Boolean | default false |

Index: `{ recipient, createdAt: -1 }`.

### messages
| Field | Type | Constraints |
|---|---|---|
| sender | ObjectId (ref User) | required |
| recipient | ObjectId (ref User) | required |
| text | String | required, maximum 2000 characters |

Index: `{ sender, recipient, createdAt: -1 }`.

### legacyenrollments
Records written by the original EduTrack dashboard (roll number, module progress). They are copied into `enrollments` and `learningprogresses` automatically.
