-- USERS
CREATE USER testuser WITH PASSWORD 'jw8s0F4';

-- DATABASES
CREATE DATABASE test OWNER testuser
    CREATE SCHEMA hollywood
        CREATE TABLE films (title text, release date, awards text[])
        CREATE VIEW winners AS
            SELECT title, release FROM films WHERE awards IS NOT NULL;
