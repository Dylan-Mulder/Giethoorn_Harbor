-- Billing
INSERT INTO billing.shipping_company (reference, name, invoice_address) VALUES 
   ('RFR-7162-MSC', 'Mediterranean Shipping Company – MSC', 'Blaak 555, 3011 GB, Rotterdam'),
	('RFR-9712-MAE', 'Maersk', 'Boompjes 40, 3011 XB, Rotterdam'),
	('RFR-0012-COS', 'COSCO Shipping Lines', 'Weena 280, 3012 NJ, Rotterdam'),
	('RFR-4729-EVE', 'Evergreen Marine Line', 'PortCity 2, Waalhaven ZZ 19, 3089 JH, Rotterdam'),
	('RFR-3624-VDL', 'Van der Linden Transport', 'Energieweg, 5145 NW, Waalwijk'),
	('RFR-8832-KLE', 'KleverCargo', 'Kingsfordweg 151, 1043 GR, Amsterdam');

INSERT INTO billing.ship_service (reference, shipping_company_id, service_provided, date, price) VALUES 
	('RFR-0000000001-SS', 2, 'Refuelling - ... - 122 gallons of heavy fuel oil', '5-28-2023', 429.33),
	('RFR-0000000002-SS', 2, 'Recharging - ... - 90kw', '5-27-2023', 87.91),
	('RFR-0000000003-SS', 2, 'Loading - ... - 83 containers', '5-26-2023', 133.20),
	('RFR-0000000004-SS', 2, 'Unloading - ... - 24 containers', '5-26-2023', 49.09);

INSERT INTO billing.lease_agreement (reference, shipping_company_id, sign_date, valid_until, price) VALUES 
	('RFR-0000000892-LA', 2, '1-1-2023', '7-1-2023', 14923.59);

INSERT INTO billing.invoice (reference, shipping_company_id, records, start_date, end_date, total_price) VALUES 
	('RFR-0000000073-IN', 2, '{"ship_services":[
      {
         "RFR-0000000001-SS":{
            "ship":"no name",
            "service":"Refuelling 122 gallons of heavy fuel oil",
            "date":"5-28-2023",
            "price":429.33
         },
         "RFR-0000000002-SS":{
            "ship":"no name",
            "service":"Recharging 90kw",
            "date":"5-27-2023",
            "price":87.91
         },
         "RFR-0000000003-SS":{
            "ship":"no name",
            "service":"Loading 83 containers",
            "date":"5-26-2023",
            "price":133.20
         },
         "RFR-0000000004-SS":{
            "ship":"no name",
            "service":"Unloading 24 containers",
            "date":"5-26-2023",
            "price":49.09
         }
      }
   ],
   "lease_agreements":[
      {
         "RFR-0000000892-LA":{
            "sign_date":"1-1-2023",
            "valid_until":"7-1-2023",
            "price":14923.59
         }
      }
   ]}', '5-1-2023', '5-31-2023', 3186.80);

-- Cargo Management
INSERT INTO cargo_management.ship (name, max_load_in_tonnage) VALUES 
	('Estelle Mærsk', 17079),
	('Emma Mærsk', 17079),
	('Sovereign Mærsk', 9156);

INSERT INTO cargo_management.cargo (ship_id, amount_of_containers, type, gross_tonnage) VALUES 
	(1, 45, 'Cars', 94),
	(1, 30, 'Electronics', 68),
	(1, 25, 'Bowling Balls', 187);

INSERT INTO cargo_management.traffic_planning (dock_name, arrival, departure) VALUES 
	('D1', '6-5-2023', '6-11-2023'),
	('D4', '6-6-2023', '6-10-2023');

INSERT INTO cargo_management.service (traffic_planning_id, ship_id, cargo_id, is_loading) VALUES 
	(1, 1, 1, true),
	(1, 1, 2, false),
	(2, 2, 3, false);

-- Dock Rental
INSERT INTO dock_rental.dock (name) VALUES 
	('D1'),
	('D2'),
	('D3'),
	('D4'),
	('D5'),
	('D6'),
	('D7'),
	('D8'),
	('D9');

INSERT INTO dock_rental.shipping_company (reference, name, country) VALUES 
   ('RFR-7162-MSC', 'Mediterranean Shipping Company – MSC', 'Switzerland'),
	('RFR-9712-MAE', 'Maersk', 'Denmark'),
	('RFR-0012-COS', 'COSCO Shipping Lines', 'China'),
	('RFR-4729-EVE', 'Evergreen Marine Line', 'Taiwan'),
	('RFR-3624-VDL', 'Van der Linden Transport', 'The Netherlands'),
	('RFR-8832-KLE', 'KleverCargo', 'The Netherlands');

INSERT INTO dock_rental.lease_agreement (reference, dock_id, shipping_company_id, sign_date, valid_until, price) VALUES 
   ('RFR-0000000892-LA', 2, 2, '1-1-2023', '7-1-2023', 14923.59);

-- Ecosystem
INSERT INTO ecosystem.marine_life_report (year, species, scientific_name, cpue, habitat) VALUES 
	(2022, 'Aal', 'Anguilla anguilla', 0.00, 'mesohaline'),
   (2022, 'Aal', 'Anguilla anguilla', 0.00, 'polyhaline'),
   (2022, 'Glasgrondel', 'Aphia minuta', 0.18, 'mesohaline'),
   (2022, 'Glasgrondel', 'Aphia minuta', 10.95, 'polyhaline'),
   (2022, 'Geep', 'Belone belone', 0.00, 'mesohaline'),
   (2022, 'Geep', 'Belone belone', 0.08, 'polyhaline'),
   (2022, 'Rode poon', 'Chelidonichthys lucerna', 0.30, 'mesohaline'),
   (2022, 'Rode poon', 'Chelidonichthys lucerna', 0.41, 'polyhaline'),
   (2022, 'Haring', 'Clupea harengus', 1054.15, 'mesohaline'),
   (2022, 'Haring', 'Clupea harengus', 1141.04, 'polyhaline'),
   (2022, 'Sprot', 'Sprattus sprattus', 7525.78, 'mesohaline'),
   (2022, 'Sprot', 'Sprattus sprattus', 28861.32, 'polyhaline');

INSERT INTO ecosystem.water_quality_report (ph, oxygen_in_mg_per_l, temperature_in_celsius, chlorine_in_mg_per_l, start_date, turbidity, diclofenac_in_ug_per_l) VALUES 
	(8.01, 11.54, 17.87, 57.0, '5-29-2323', 18.0, 0.5);

-- Messaging
INSERT INTO messaging.invoice (reference, shipping_company_name, records, month, total_price) VALUES 
	('RFR-0000000073-IN', 'Maersk', '{"ship_services":[
      {
         "RFR-0000000001-SS":{
            "ship":"no name",
            "service":"Refuelling 122 gallons of heavy fuel oil",
            "date":"5-28-2023",
            "price":429.33
         },
         "RFR-0000000002-SS":{
            "ship":"no name",
            "service":"Recharging 90kw",
            "date":"5-27-2023",
            "price":87.91
         },
         "RFR-0000000003-SS":{
            "ship":"no name",
            "service":"Loading 83 containers",
            "date":"5-26-2023",
            "price":133.20
         },
         "RFR-0000000004-SS":{
            "ship":"no name",
            "service":"Unloading 24 containers",
            "date":"5-26-2023",
            "price":49.09
         }
      }
   ],
   "lease_agreements":[
      {
         "RFR-0000000892-LA":{
            "sign_date":"1-1-2023",
            "valid_until":"7-1-2023",
            "price":14923.59
         }
      }
   ]}', 'May', 3186.80);

-- Publications
INSERT INTO publications.marine_life_report (year, species, scientific_name, cpue) VALUES 
   (2022, 'Aal', 'Anguilla anguilla', 0.00),
   (2022, 'Glasgrondel', 'Aphia minuta', 10.95),
   (2022, 'Geep', 'Belone belone', 0.08),
   (2022, 'Rode poon', 'Chelidonichthys lucerna', 0.41),
   (2022, 'Haring', 'Clupea harengus', 1141.04),
   (2022, 'Sprot', 'Sprattus sprattus', 28861.32);

INSERT INTO publications.water_quality_report (ph, oxygen_in_mg_per_l, temperature_in_celsius, chlorine_in_mg_per_l, start_date) VALUES 
   (8.01, 11.54, 17.87, 57.0, '5-29-2323');

INSERT INTO publications.traffic_planning (passages, start_date, end_date) VALUES 
   ('{
   "passages":[
      {
         "dock_id":1,
         "ship_id":2,
         "truck_id":null,
         "tugboats":[
            {
               "name":"Jan"
            },
            {
               "name":"Ouwe Trekkert"
            }
         ],
         "arrival":"6-8-2023",
         "departure":"6-11-2023"
      },
      {
         "dock_id":1,
         "ship_id":null,
         "truck_id":1,
         "tugboats":[
            
         ],
         "arrival":"6-7-2023",
         "departure":"6-7-2023"
      },
      {
         "dock_id":1,
         "ship_id":null,
         "truck_id":2,
         "tugboats":[
            
         ],
         "arrival":"6-10-2023",
         "departure":"6-10-2023"
      },
      {
         "dock_id":6,
         "ship_id":3,
         "truck_id":null,
         "tugboats":[
            {
               "name":"De Stoomboot"
            },
            {
               "name":"Het Puttertje"
            },
            {
               "name":"Jan"
            },
            {
               "name":"Ouwe Trekkert"
            }
         ],
         "arrival":"6-7-2023",
         "departure":"6-9-2023"
      },
      {
         "dock_id":6,
         "ship_id":null,
         "truck_id":3,
         "tugboats":[
            
         ],
         "arrival":"6-8-2023",
         "departure":"6-8-2023"
      }
   ]}', '6-5-2023', '6-11-2023');

-- Refilling
INSERT INTO refilling.ship (name) VALUES 
	('Emma Mærsk');

INSERT INTO refilling.traffic_planning (dock_name, arrival, departure) VALUES 
   ('D1', '6-8-2023', '6-11-2023');

INSERT INTO refilling.service (traffic_planning_id, ship_id, needs_refuelling, needs_recharging) VALUES 
	(1, 1, false, true);

-- Security
INSERT INTO security.ship (name, expected_cargo) VALUES 
	('Emma Mærsk', 'Cars & Heavy Machinery'),
   ('Sovereign Mærsk', 'Bowling Balls');

INSERT INTO security.truck (name, expected_cargo) VALUES 
   ('VDL Bobbejan', 'Cars'),
   ('VDL Wilhelmus', 'Cars'),
   ('VDL Bartholomeus', 'Cars');

INSERT INTO security.traffic_planning (dock_name, arrival) VALUES 
   ('D1', '6-8-2023'),
   ('D1', '6-7-2023'),
   ('D1', '6-10-2023'),
   ('D6', '6-7-2023'),
   ('D6', '6-8-2023');

INSERT INTO security.inspection (traffic_planning_id, ship_id, truck_id, supervisor, scheduled_for) VALUES 
   (1, 1, NULL, 'Marcel de Groot', '6-9-2023'),
   (2, NULL, 1, 'Robin Schellius', '6-7-2023'),
   (3, NULL, 2, 'Robin Schellius', '6-10-2023'),
   (4, 2, NULL, 'Marcel de Groot', '6-7-2023'),
   (5, NULL, 3, 'Robin Schellius', '6-8-2023');

-- Traffic Control
INSERT INTO traffic_control.dock (name, amount_of_ship_spots, amount_of_truck_spots) VALUES 
	('D1', 1, 12),
	('D2', 1, 12),
	('D3', 1, 12),
	('D4', 3, 4),
	('D5', 1, 24),
	('D6', 1, 24),
	('D7', 1, 24),
	('D8', 1, 24),
	('D9', 2, 36);

INSERT INTO traffic_control.ship (name, shipping_company_name, max_load_in_tonnage, length_in_m) VALUES 
   ('Estelle Mærsk', 'Maersk', 17079, 397),
	('Emma Mærsk', 'Maersk', 17079, 397),
	('Sovereign Mærsk', 'Maersk', 9156, 346);

INSERT INTO traffic_control.truck (name, shipping_company_name) VALUES 
   ('VDL Bobbejan', 'Van der Linden Transport'),
   ('VDL Wilhelmus', 'Van der Linden Transport'),
   ('VDL Bartholomeus', 'Van der Linden Transport');

INSERT INTO traffic_control.tugboat (name) VALUES 
   ('De Stoomboot'),
   ('Het Puttertje'),
   ('Jan'),
   ('Ouwe Trekkert');

INSERT INTO traffic_control.passage (dock_id, ship_id, truck_id, tugboats, arrival, departure) VALUES 
   (1, 2, NULL, '{
   "tugboats":[
      {
         "name":"Jan"
      },
      {
         "name":"Ouwe Trekkert"
      }
   ]}', '6-8-2023', '6-11-2023'),
   (1, NULL, 1, '{}', '6-7-2023', '6-7-2023'),
   (1, NULL, 2, '{}', '6-10-2023', '6-10-2023'),
   (6, 3, NULL, '{
   "tugboats":[
      {
         "name":"De Stoomboot"
      },
      {
         "name":"Het Puttertje"
      },
      {
         "name":"Jan"
      },
      {
         "name":"Ouwe Trekkert"
      }
   ]}', '6-7-2023', '6-9-2023'),
   (6, NULL, 3, '{}', '6-8-2023', '6-8-2023');

INSERT INTO traffic_control.traffic_planning (passages, start_date, end_date) VALUES 
   ('{
   "passages":[
      {
         "dock_id":1,
         "ship_id":2,
         "truck_id":null,
         "tugboats":[
            {
               "name":"Jan"
            },
            {
               "name":"Ouwe Trekkert"
            }
         ],
         "arrival":"6-8-2023",
         "departure":"6-11-2023"
      },
      {
         "dock_id":1,
         "ship_id":null,
         "truck_id":1,
         "tugboats":[
            
         ],
         "arrival":"6-7-2023",
         "departure":"6-7-2023"
      },
      {
         "dock_id":1,
         "ship_id":null,
         "truck_id":2,
         "tugboats":[
            
         ],
         "arrival":"6-10-2023",
         "departure":"6-10-2023"
      },
      {
         "dock_id":6,
         "ship_id":3,
         "truck_id":null,
         "tugboats":[
            {
               "name":"De Stoomboot"
            },
            {
               "name":"Het Puttertje"
            },
            {
               "name":"Jan"
            },
            {
               "name":"Ouwe Trekkert"
            }
         ],
         "arrival":"6-7-2023",
         "departure":"6-9-2023"
      },
      {
         "dock_id":6,
         "ship_id":null,
         "truck_id":3,
         "tugboats":[
            
         ],
         "arrival":"6-8-2023",
         "departure":"6-8-2023"
      }
   ]}', '6-5-2023', '6-11-2023');