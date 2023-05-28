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
DROP SCHEMA public;
CREATE SCHEMA traffic_control;
CREATE SCHEMA dock_rental;
CREATE SCHEMA ecosystem;
CREATE SCHEMA security;
CREATE SCHEMA refilling;
CREATE SCHEMA cargo_management;
CREATE SCHEMA publications;
CREATE SCHEMA billing;
CREATE SCHEMA messaging;

-- TABLES
-- Traffic Control
CREATE TABLE traffic_control.traffic_planning
(
    id serial NOT NULL,
    passages jsonb NOT NULL,
    start_date date NOT NULL,
    end_date date NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.passage
(
    id serial NOT NULL,
    dock_id integer NOT NULL,
    ship_id integer,
    truck_id integer,
    tugboats jsonb NOT NULL,
    arrival timestamp without time zone NOT NULL,
    departure timestamp without time zone NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.ship
(
    id serial NOT NULL,
    name text NOT NULL,
    shipping_company_name text NOT NULL,
    gross_tonnage integer NOT NULL,
    length integer NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.truck
(
    id serial NOT NULL,
    name text NOT NULL,
    shipping_company_name text NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.dock
(
    id serial NOT NULL,
    name text NOT NULL,
    description text DEFAULT 'No description provided',
    amount_of_ship_spots integer DEFAULT 1,
    amount_of_truck_spots integer DEFAULT 3,
    PRIMARY KEY (id)
);
CREATE TABLE traffic_control.tugboat
(
    id serial NOT NULL,
    name text NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS traffic_control.traffic_planning
    OWNER to gh_traffic_control;
ALTER TABLE IF EXISTS traffic_control.passage
    OWNER to gh_traffic_control,
    ADD CONSTRAINT fk_dock FOREIGN KEY(dock_id) REFERENCES traffic_control.dock(id),
    ADD CONSTRAINT fk_ship FOREIGN KEY(ship_id) REFERENCES traffic_control.ship(id),
    ADD CONSTRAINT fk_truck FOREIGN KEY(truck_id) REFERENCES traffic_control.truck(id);
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
    name text NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE dock_rental.shipping_company
(
    id serial NOT NULL,
    name text NOT NULL,
    kvk_number integer NOT NULL,
    country text NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE dock_rental.lease_agreement
(
    id serial NOT NULL,
    uuid uuid NOT NULL,
    dock_id integer NOT NULL,
    shipping_company_id integer NOT NULL,
    sign_date date NOT NULL,
    valid_until date NOT NULL,
    price numeric(18, 2) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS dock_rental.dock
    OWNER to gh_dock_rental;
ALTER TABLE IF EXISTS dock_rental.shipping_company
    OWNER to gh_dock_rental;
ALTER TABLE IF EXISTS dock_rental.lease_agreement
    OWNER to gh_dock_rental,
    ADD CONSTRAINT fk_dock FOREIGN KEY(dock_id) REFERENCES dock_rental.dock(id),
    ADD CONSTRAINT fk_shipping_company FOREIGN KEY(shipping_company_id) REFERENCES dock_rental.shipping_company(id);

-- Billing
CREATE TABLE billing.ship_service
(
    id serial NOT NULL,
    invoice_id integer NOT NULL,
    service_provided text NOT NULL,
    price numeric(18, 2) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE billing.shipping_company
(
    id serial NOT NULL,
    name text NOT NULL,
    kvk_number integer NOT NULL,
    invoice_address text NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE billing.lease_agreement
(
    id serial NOT NULL,
    uuid uuid NOT NULL,
    invoice_id integer NOT NULL,
    sign_date date NOT NULL,
    valid_until date NOT NULL,
    price numeric(18, 2) NOT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE billing.invoice
(
    id serial NOT NULL,
    uuid uuid NOT NULL,
    shipping_company_id integer NOT NULL,
    total_price numeric(18, 2) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS billing.ship_service
    OWNER to gh_billing,
    ADD CONSTRAINT fk_invoice FOREIGN KEY(invoice_id) REFERENCES billing.invoice(id);
ALTER TABLE IF EXISTS billing.shipping_company
    OWNER to gh_billing;
ALTER TABLE IF EXISTS billing.lease_agreement
    OWNER to gh_billing,
    ADD CONSTRAINT fk_invoice FOREIGN KEY(invoice_id) REFERENCES billing.invoice(id);
ALTER TABLE IF EXISTS billing.invoice
    OWNER to gh_billing,
    ADD CONSTRAINT fk_shipping_company FOREIGN KEY(shipping_company_id) REFERENCES billing.shipping_company(id);