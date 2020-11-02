drop database pyinic;
create database pyinic;
use pyinic;
CREATE TABLE approvescourses (
    note                INTEGER NOT NULL,
    user_carne          INTEGER NOT NULL,
    pensum_codepensum   INTEGER NOT NULL
);

ALTER TABLE approvescourses ADD CONSTRAINT approvescourses_pk PRIMARY KEY ( user_carne,
                                                                            pensum_codepensum );

CREATE TABLE commentary (
    codecommentary                INTEGER NOT NULL,
    message                       VARCHAR(200) NOT NULL,
    publication_codepublication   INTEGER NOT NULL,
    user_carne                    INTEGER NOT NULL
);

ALTER TABLE commentary ADD CONSTRAINT commentary_pk PRIMARY KEY ( codecommentary );

CREATE TABLE course (
    codecourse   INTEGER NOT NULL,
    name         VARCHAR(45) NOT NULL
);

ALTER TABLE course ADD CONSTRAINT course_pk PRIMARY KEY ( codecourse );

CREATE TABLE courseprofessor (
    codecourseprofessor       INTEGER NOT NULL,
    course_codecourse         INTEGER NOT NULL,
    professor_codeprofessor   INTEGER NOT NULL
);

ALTER TABLE courseprofessor ADD CONSTRAINT courseprofessor_pk PRIMARY KEY ( codecourseprofessor );

CREATE TABLE pensum (
    codepensum          INTEGER NOT NULL,
    credits             INTEGER NOT NULL,
    semester            INTEGER NOT NULL,
    course_codecourse   INTEGER NOT NULL
);

ALTER TABLE pensum ADD CONSTRAINT pensum_pk PRIMARY KEY ( codepensum );

CREATE TABLE professor (
    codeprofessor   INTEGER NOT NULL,
    names           VARCHAR(45) NOT NULL,
    lastnames       VARCHAR(45) NOT NULL
);

ALTER TABLE professor ADD CONSTRAINT professor_pk PRIMARY KEY ( codeprofessor );

CREATE TABLE publication (
    codepublication           INTEGER NOT NULL,
    message                   VARCHAR(200) NOT NULL,
    datepublication           DATE NOT NULL,
    typepublication           INTEGER NOT NULL,
    professor_codeprofessor   INTEGER NOT NULL,
    courseprofessor_code      INTEGER NOT NULL,
    course_codecourse         INTEGER NOT NULL,
    user_carne                INTEGER NOT NULL
);

ALTER TABLE publication ADD CONSTRAINT publication_pk PRIMARY KEY ( codepublication );

CREATE TABLE users (
    carne       INTEGER NOT NULL,
    names       VARCHAR(45) NOT NULL,
    lastnames   VARCHAR(45) NOT NULL,
    password    VARCHAR(45) NOT NULL,
    mail        VARCHAR(45) NOT NULL
);

ALTER TABLE users ADD CONSTRAINT user_pk PRIMARY KEY ( carne );

ALTER TABLE approvescourses
    ADD CONSTRAINT approvescourses_pensum_fk FOREIGN KEY ( pensum_codepensum )
        REFERENCES pensum ( codepensum );

ALTER TABLE approvescourses
    ADD CONSTRAINT approvescourses_user_fk FOREIGN KEY ( user_carne )
        REFERENCES users ( carne );

ALTER TABLE commentary
    ADD CONSTRAINT commentary_publication_fk FOREIGN KEY ( publication_codepublication )
        REFERENCES publication ( codepublication );

ALTER TABLE commentary
    ADD CONSTRAINT commentary_user_fk FOREIGN KEY ( user_carne )
        REFERENCES users ( carne );

ALTER TABLE courseprofessor
    ADD CONSTRAINT courseprofessor_course_fk FOREIGN KEY ( course_codecourse )
        REFERENCES course ( codecourse );

ALTER TABLE courseprofessor
    ADD CONSTRAINT courseprofessor_professor_fk FOREIGN KEY ( professor_codeprofessor )
        REFERENCES professor ( codeprofessor );

ALTER TABLE pensum
    ADD CONSTRAINT pensum_course_fk FOREIGN KEY ( course_codecourse )
        REFERENCES course ( codecourse );

ALTER TABLE publication
    ADD CONSTRAINT publication_course_fk FOREIGN KEY ( course_codecourse )
        REFERENCES course ( codecourse );

ALTER TABLE publication
    ADD CONSTRAINT publication_courseprofessor_fk FOREIGN KEY ( courseprofessor_code )
        REFERENCES courseprofessor ( codecourseprofessor );

ALTER TABLE publication
    ADD CONSTRAINT publication_professor_fk FOREIGN KEY ( professor_codeprofessor )
        REFERENCES professor ( codeprofessor );

ALTER TABLE publication
    ADD CONSTRAINT publication_user_fk FOREIGN KEY ( user_carne )
        REFERENCES users ( carne );
