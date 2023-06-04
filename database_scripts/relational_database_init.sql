CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

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
-- Traffic Control
CREATE TABLE traffic_control.traffic_planning
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    passages jsonb NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.passage
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    dock_id integer NOT NULL,
    ship_id integer,
    truck_id integer,
    tugboats jsonb NOT NULL,
    arrival date NOT NULL,
    departure date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.ship
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    shipping_company_name text NOT NULL,
    max_load_in_tonnage integer NOT NULL,
    length_in_m integer NOT NULL,
    is_cleared boolean NOT NULL DEFAULT false,
    is_denied boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.truck
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    shipping_company_name text NOT NULL,
    is_cleared boolean NOT NULL DEFAULT false,
    is_denied boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.dock
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    description text DEFAULT 'No description provided',
    amount_of_ship_spots integer DEFAULT 1,
    amount_of_truck_spots integer DEFAULT 3,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.tugboat
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS traffic_control.traffic_planning
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.passage
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.ship
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.truck
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.dock
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.tugboat
    OWNER to gh_traffic_control;

-- Dock Rental
CREATE TABLE dock_rental.dock
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE dock_rental.shipping_company
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    name text NOT NULL,
    country text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_shipping_company UNIQUE(reference)
);
CREATE TABLE dock_rental.lease_agreement
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    dock_id integer NOT NULL,
    shipping_company_id integer NOT NULL,
    sign_date date NOT NULL,
    valid_until date NOT NULL,
    price numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_lease_agreement UNIQUE(reference)
);

CREATE VIEW dock_rental.denormalized_lease_agreement AS
	SELECT 
		la.reference AS lease_agreement_reference,
		sc.reference AS shipping_company_reference,
		sc.name AS shipping_company_name,
		sc.country AS shipping_company_country,
		d.name AS dock_name,
		la.sign_date,
		la.valid_until,
		la.price
	FROM dock_rental.lease_agreement AS la
	INNER JOIN dock_rental.dock AS d ON la.dock_id=d.id
	INNER JOIN dock_rental.shipping_company AS sc ON la.shipping_company_id=sc.id;

ALTER TABLE IF EXISTS dock_rental.dock
    OWNER to gh_dock_rental;
ALTER TABLE IF EXISTS dock_rental.shipping_company
    OWNER to gh_dock_rental;
ALTER TABLE IF EXISTS dock_rental.lease_agreement
    OWNER to gh_dock_rental;
ALTER VIEW IF EXISTS dock_rental.denormalized_lease_agreement
    OWNER to gh_dock_rental;

-- Ecosystem
CREATE TABLE ecosystem.marine_life_report
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    year integer NOT NULL,
    species text NOT NULL,
    scientific_name text NOT NULL,
    cpue numeric(18, 2) NOT NULL,
    habitat text NOT NULL,
    season text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE ecosystem.water_quality_report
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ph numeric(18, 2) NOT NULL,
    oxygen_in_mg_per_l numeric(18, 2) NOT NULL,
    temperature_in_celsius numeric(18, 2) NOT NULL,
    chlorine_in_mg_per_l numeric(18, 2) NOT NULL,
    start_date date NOT NULL,
    turbidity numeric(18, 2) NOT NULL,
    diclofenac_in_ug_per_l numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS ecosystem.marine_life_report
    OWNER to gh_ecosystem;
ALTER TABLE IF EXISTS ecosystem.water_quality_report
    OWNER to gh_ecosystem;

-- Security
CREATE TABLE security.truck
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    expected_cargo text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE security.ship
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    expected_cargo text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE security.traffic_planning
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    dock_name text NOT NULL,
    arrival date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE security.inspection
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    traffic_planning_id integer NOT NULL,
    ship_id integer,
    truck_id integer,
    supervisor text NOT NULL,
    scheduled_for date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS security.truck
    OWNER to gh_security;
ALTER TABLE IF EXISTS security.ship
    OWNER to gh_security;
ALTER TABLE IF EXISTS security.traffic_planning
    OWNER to gh_security;
ALTER TABLE IF EXISTS security.inspection
    OWNER to gh_security;

-- Refilling
CREATE TABLE refilling.ship
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE refilling.traffic_planning
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    dock_name text NOT NULL,
    arrival date NOT NULL,
    departure date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE refilling.service
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    traffic_planning_id integer NOT NULL,
    ship_id integer NOT NULL,
    needs_refuelling boolean NOT NULL DEFAULT false,
    needs_recharging boolean NOT NULL DEFAULT false,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS refilling.ship
    OWNER to gh_refilling;
ALTER TABLE IF EXISTS refilling.traffic_planning
    OWNER to gh_refilling;
ALTER TABLE IF EXISTS refilling.service
    OWNER to gh_refilling;

-- Cargo Management
CREATE TABLE cargo_management.cargo
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ship_id integer NOT NULL,
    amount_of_containers integer NOT NULL,
    type text NOT NULL,
    gross_tonnage integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE cargo_management.ship
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    name text NOT NULL,
    max_load_in_tonnage integer NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE cargo_management.traffic_planning
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    dock_name text NOT NULL,
    arrival date NOT NULL,
    departure date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE cargo_management.service
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    traffic_planning_id integer NOT NULL,
    ship_id integer NOT NULL,
    cargo_id integer NOT NULL,
    is_loading boolean NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS cargo_management.cargo
    OWNER to gh_cargo_management;
ALTER TABLE IF EXISTS cargo_management.ship
    OWNER to gh_cargo_management;
ALTER TABLE IF EXISTS cargo_management.traffic_planning
    OWNER to gh_cargo_management;
ALTER TABLE IF EXISTS cargo_management.service
    OWNER to gh_cargo_management;

-- Publications
CREATE TABLE publications.traffic_planning
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    passages jsonb NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE publications.marine_life_report
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    year integer NOT NULL,
    species text NOT NULL,
    scientific_name text NOT NULL,
    cpue numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);
CREATE TABLE publications.water_quality_report
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    ph numeric(18, 2) NOT NULL,
    oxygen_in_mg_per_l numeric(18, 2) NOT NULL,
    temperature_in_celsius numeric(18, 2) NOT NULL,
    chlorine_in_mg_per_l numeric(18, 2) NOT NULL,
    start_date date NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS publications.traffic_planning
    OWNER to gh_publications;
ALTER TABLE IF EXISTS publications.marine_life_report
    OWNER to gh_publications;
ALTER TABLE IF EXISTS publications.water_quality_report
    OWNER to gh_publications;

-- Billing
CREATE TABLE billing.ship_service
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    shipping_company_id integer NOT NULL,
    service_provided text NOT NULL,
    date date NOT NULL,
    price numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_ship_service UNIQUE(reference)
);
CREATE TABLE billing.shipping_company
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    name text NOT NULL,
    invoice_address text NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_shipping_company UNIQUE(reference)
);
CREATE TABLE billing.lease_agreement
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    shipping_company_id integer NOT NULL,
    sign_date date NOT NULL,
    valid_until date NOT NULL,
    price numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_lease_agreement UNIQUE(reference)
);
CREATE TABLE billing.invoice
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    shipping_company_id integer NOT NULL,
    records jsonb NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    total_price numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_invoice UNIQUE(reference)
);

ALTER TABLE IF EXISTS billing.ship_service
    OWNER to gh_billing;
ALTER TABLE IF EXISTS billing.shipping_company
    OWNER to gh_billing;
ALTER TABLE IF EXISTS billing.lease_agreement
    OWNER to gh_billing;
ALTER TABLE IF EXISTS billing.invoice
    OWNER to gh_billing;

-- Messaging
CREATE TABLE messaging.invoice
(
    id serial NOT NULL,
    stream_id uuid NOT NULL DEFAULT gen_random_uuid(),
    reference text NOT NULL,
    shipping_company_name text NOT NULL,
    records jsonb NOT NULL,
    month text NOT NULL,
    total_price numeric(18, 2) NOT NULL,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    PRIMARY KEY (id),
    CONSTRAINT unique_invoice UNIQUE(reference)
);

ALTER TABLE IF EXISTS messaging.invoice
    OWNER to gh_messaging;