-- USERS
CREATE USER gh_traffic_control WITH PASSWORD 'nsg762dsak21';
CREATE USER gh_dock_rental WITH PASSWORD 'nWiuybw4o2o';
CREATE USER gh_ecosystem WITH PASSWORD 'URY382992ef';
CREATE USER gh_security WITH PASSWORD 'NUF229kk8&3';
CREATE USER gh_refilling WITH PASSWORD 'jw8s0F4';
CREATE USER gh_cargo_management WITH PASSWORD 'kNY2772i9d';
CREATE USER gh_publications WITH PASSWORD 'pAKsf8273gaS';
CREATE USER gh_billing WITH PASSWORD 'varwcdy2uFDS';
CREATE USER gh_messaging WITH PASSWORD 'MmMmMQmqnhfy26';

-- SCHEMA'S
DROP SCHEMA public CASCADE;
CREATE SCHEMA traffic_control;
CREATE SCHEMA dock_rental;
CREATE SCHEMA ecosystem;
CREATE SCHEMA security;
CREATE SCHEMA refilling;
CREATE SCHEMA cargo_management;
CREATE SCHEMA publications;
CREATE SCHEMA billing;
CREATE SCHEMA messaging;

ALTER SCHEMA traffic_control
    OWNER to gh_traffic_control;
ALTER SCHEMA dock_rental
    OWNER to gh_dock_rental;
ALTER SCHEMA ecosystem
    OWNER to gh_ecosystem;
ALTER SCHEMA security
    OWNER to gh_security;
ALTER SCHEMA refilling
    OWNER to gh_refilling;
ALTER SCHEMA cargo_management
    OWNER to gh_cargo_management;
ALTER SCHEMA publications
    OWNER to gh_publications;
ALTER SCHEMA billing
    OWNER to gh_billing;
ALTER SCHEMA messaging
    OWNER to gh_messaging;

-- TABLES
CREATE TABLE traffic_control.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS traffic_control.event
    OWNER to gh_traffic_control;

CREATE TABLE dock_rental.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS dock_rental.event
    OWNER to gh_dock_rental;

CREATE TABLE ecosystem.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS ecosystem.event
    OWNER to gh_ecosystem;

CREATE TABLE security.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS security.event
    OWNER to gh_security;

CREATE TABLE refilling.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS refilling.event
    OWNER to gh_refilling;

CREATE TABLE cargo_management.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS cargo_management.event
    OWNER to gh_cargo_management;

CREATE TABLE publications.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS publications.event
    OWNER to gh_publications;

CREATE TABLE billing.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS billing.event
    OWNER to gh_billing;

CREATE TABLE messaging.event
(
    id serial NOT NULL,
    stream_id text NOT NULL,
    type text NOT NULL,
    body jsonb NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_event_stream_sequence UNIQUE(stream_id, created_at)
);
ALTER TABLE IF EXISTS messaging.event
    OWNER to gh_messaging;