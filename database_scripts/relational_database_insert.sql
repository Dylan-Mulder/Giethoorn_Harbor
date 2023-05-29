-- Billing
INSERT INTO billing.shipping_company (stream_id, reference, name, invoice_address) VALUES 
   ('8c31e01d-0ea8-496c-b107-cb9322b5597f', 'RFR-7162-MSC', 'Mediterranean Shipping Company – MSC', 'Blaak 555, 3011 GB, Rotterdam'),
	('d525a420-5ec8-4ce2-87fe-1fb609c14def', 'RFR-9712-MAE', 'Maersk', 'Boompjes 40, 3011 XB, Rotterdam'),
	('6ef26626-c3cb-42c3-897d-c8d6c942750e', 'RFR-0012-COS', 'COSCO Shipping Lines', 'Weena 280, 3012 NJ, Rotterdam'),
	('9d618818-be2e-44c2-aa51-6624ca81c3b8', 'RFR-4729-EVE', 'Evergreen Marine Line', 'PortCity 2, Waalhaven ZZ 19, 3089 JH, Rotterdam'),
	('e7a59536-fc04-4855-b7b8-850425f80d7e', 'RFR-3624-VDL', 'Van der Linden Transport', 'Energieweg, 5145 NW, Waalwijk'),
	('a7f5b443-fa5b-407b-8eb9-65379971ad10', 'RFR-8832-KLE', 'KleverCargo', 'Kingsfordweg 151, 1043 GR, Amsterdam');

INSERT INTO billing.ship_service (stream_id, reference, shipping_company_id, service_provided, date, price) VALUES 
	('24f949b2-afc5-4a01-a6ef-395aa5a40276', 'RFR-0000000001-SS', 2, 'Refuelling - ... - 122 gallons of heavy fuel oil', '5-28-2023', 429.33),
	('e155eaaf-24e7-4648-94f5-ae147b624f1e', 'RFR-0000000002-SS', 2, 'Recharging - ... - 90kw', '5-27-2023', 87.91),
	('a22f1591-f870-42d1-a8a8-764aa24238a9', 'RFR-0000000003-SS', 2, 'Loading - ... - 83 containers', '5-26-2023', 133.20),
	('e90e9868-b494-4783-852c-2a98db060f01', 'RFR-0000000004-SS', 2, 'Unloading - ... - 24 containers', '5-26-2023', 49.09);

INSERT INTO billing.lease_agreement (stream_id, reference, shipping_company_id, sign_date, valid_until, price) VALUES 
	('400948e1-f247-4751-a772-a59052f8dbbb', 'RFR-0000000892-LA', 2, '1-1-2023', '7-1-2023', 14923.59);

INSERT INTO billing.invoice (stream_id, reference, shipping_company_id, records, start_date, end_date, total_price) VALUES 
	('012157e7-11d5-46d1-84b2-165f99be4b77', 'RFR-0000000073-IN', 2, '{"ship_services":[
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
INSERT INTO cargo_management.ship (stream_id, name, max_load_in_tonnage) VALUES 
	('e1814412-7d70-4bff-925f-9a4293d5e8a6', 'Estelle Mærsk', 17079),
	('2b5a9df2-9828-454b-b1b9-4c273c509cb7', 'Emma Mærsk', 17079),
	('788e06e4-d9bf-49bd-93da-b41158688456', 'Sovereign Mærsk', 9156);

INSERT INTO cargo_management.cargo (stream_id, ship_id, amount_of_containers, type, gross_tonnage) VALUES 
	('3af5c446-435b-46a2-80d0-a43aaf26240c', 1, 45, 'Cars', 94),
	('ff6eaa27-edeb-48bd-a438-d89157874441', 1, 30, 'Electronics', 68),
	('bca6cc37-9c97-4e49-b806-13f51435665f', 1, 25, 'Bowling Balls', 187);

INSERT INTO cargo_management.traffic_planning (stream_id, dock_name, arrival, departure) VALUES 
	('aa3cb7c7-4009-4889-b31d-40b9843454c1', 'D1', '6-5-2023', '6-11-2023'),
	('72dbbd9c-4141-4930-a60e-1077800fc1ee', 'D4', '6-6-2023', '6-10-2023');

INSERT INTO cargo_management.service (stream_id, traffic_planning_id, ship_id, cargo_id, is_loading) VALUES 
	('f5624382-59f9-428e-ae22-2d588bef15f9', 1, 1, 1, true),
	('2f5c5d40-ae03-4cf5-9e26-8c0e1ba4a696', 1, 1, 2, false),
	('d25d7f27-0e55-4163-9929-350247e68455', 2, 2, 3, false);

-- Dock Rental
INSERT INTO dock_rental.dock (stream_id, name) VALUES 
	('1888581d-1c0d-4d4c-a78c-5890a6cd84e5', 'D1'),
	('8bb8d200-2f35-4881-be91-428f29992728', 'D2'),
	('77354a93-2143-4b18-81a4-a75365d1a62e', 'D3'),
	('4e46d1f7-1b59-468a-a016-de9ed9d319e8', 'D4'),
	('adbe0e9a-5a56-4a01-995d-45d69f4749e5', 'D5'),
	('3b12c99b-61c9-4a1c-a234-0e005fa531ea', 'D6'),
	('e2248dfd-3fc5-4e6a-8c12-5642d8e0e477', 'D7'),
	('fcb1f45f-2452-4972-8d72-1a5ad6a64256', 'D8'),
	('60add6d2-86ac-4175-8649-f9b939889bfc', 'D9');

INSERT INTO dock_rental.shipping_company (stream_id, reference, name, country) VALUES 
   ('1e86348e-91a5-494c-bcc3-4fbe1f453c15', 'RFR-7162-MSC', 'Mediterranean Shipping Company – MSC', 'Switzerland'),
	('80f1720f-0a0a-4789-a085-1bf03d1b241f', 'RFR-9712-MAE', 'Maersk', 'Denmark'),
	('d6434936-4239-45d9-9a9f-e2f0a99a410c', 'RFR-0012-COS', 'COSCO Shipping Lines', 'China'),
	('e1874429-0c7a-49b1-a79e-e70ea50d42e3', 'RFR-4729-EVE', 'Evergreen Marine Line', 'Taiwan'),
	('f2210bcd-0a20-48e1-9a79-3eb7ce55492f', 'RFR-3624-VDL', 'Van der Linden Transport', 'The Netherlands'),
	('ef24ef78-80cd-4087-af1e-b117636b4ea6', 'RFR-8832-KLE', 'KleverCargo', 'The Netherlands');

INSERT INTO dock_rental.lease_agreement (stream_id, reference, dock_id, shipping_company_id, sign_date, valid_until, price) VALUES 
   ('c90187c6-6cb2-4fc8-80d4-5d5313785a07', 'RFR-0000000892-LA', 2, 2, '1-1-2023', '7-1-2023', 14923.59);

-- Ecosystem
INSERT INTO ecosystem.marine_life_report (stream_id, year, species, scientific_name, cpue, habitat) VALUES 
	('fe5cf121-eadc-4eb2-8942-2d5843d9f199', 2022, 'Aal', 'Anguilla anguilla', 0.00, 'mesohaline'),
   ('d8adad5d-5438-44e5-b33d-ab6dd1667fc0', 2022, 'Aal', 'Anguilla anguilla', 0.00, 'polyhaline'),
   ('b308c738-857c-4a2f-9372-239e30616995', 2022, 'Glasgrondel', 'Aphia minuta', 0.18, 'mesohaline'),
   ('1ca2583f-db99-4f59-89f6-44134a4cfa88', 2022, 'Glasgrondel', 'Aphia minuta', 10.95, 'polyhaline'),
   ('bc147b21-e907-4af5-b663-6c1eede58115', 2022, 'Geep', 'Belone belone', 0.00, 'mesohaline'),
   ('55dbeb58-d648-4d85-8547-54f60e6ac65b', 2022, 'Geep', 'Belone belone', 0.08, 'polyhaline'),
   ('63205204-8b38-47f9-ae80-aad5796715ec', 2022, 'Rode poon', 'Chelidonichthys lucerna', 0.30, 'mesohaline'),
   ('ff0654a0-f61e-4bb0-89c0-ff0809e26ae4', 2022, 'Rode poon', 'Chelidonichthys lucerna', 0.41, 'polyhaline'),
   ('c1c2cffd-1258-4ac6-bf90-319e008d4012', 2022, 'Haring', 'Clupea harengus', 1054.15, 'mesohaline'),
   ('052c7c75-c07b-490d-a14e-30ab60d3ca80', 2022, 'Haring', 'Clupea harengus', 1141.04, 'polyhaline'),
   ('a10dc486-9112-4ec3-8a12-e071ea315399', 2022, 'Sprot', 'Sprattus sprattus', 7525.78, 'mesohaline'),
   ('dcf309a4-e687-4414-824f-9e116dd661df', 2022, 'Sprot', 'Sprattus sprattus', 28861.32, 'polyhaline');

INSERT INTO ecosystem.water_quality_report (stream_id, ph, oxygen_in_mg_per_l, temperature_in_celsius, chlorine_in_mg_per_l, start_date, turbidity, diclofenac_in_ug_per_l) VALUES 
	('d0df3d8e-0704-41c3-81db-49d52ae5d03c', 8.01, 11.54, 17.87, 57.0, '5-29-2323', 18.0, 0.5);

-- Messaging
INSERT INTO messaging.invoice (stream_id, reference, shipping_company_name, records, month, total_price) VALUES 
	('ad0c6a88-93c2-4fc1-8e1b-f6b712b89622', 'RFR-0000000073-IN', 'Maersk', '{"ship_services":[
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
INSERT INTO publications.marine_life_report (stream_id, year, species, scientific_name, cpue) VALUES 
   ('af6f81d0-c1f8-4c55-a08a-baf98efdea35', 2022, 'Aal', 'Anguilla anguilla', 0.00),
   ('6cd50afd-5298-445c-bb72-ad30e2b72200', 2022, 'Glasgrondel', 'Aphia minuta', 10.95),
   ('4db69b12-30af-4769-a8c2-816b331995b7', 2022, 'Geep', 'Belone belone', 0.08),
   ('2e7008b1-29ca-42f5-8929-d664a2f46b47', 2022, 'Rode poon', 'Chelidonichthys lucerna', 0.41),
   ('6cdc3e2d-f9bf-4e2c-adf0-01c184880e05', 2022, 'Haring', 'Clupea harengus', 1141.04),
   ('1afa5cff-1e49-482c-866f-a25eef29524d', 2022, 'Sprot', 'Sprattus sprattus', 28861.32);

INSERT INTO publications.water_quality_report (stream_id, ph, oxygen_in_mg_per_l, temperature_in_celsius, chlorine_in_mg_per_l, start_date) VALUES 
   ('826f32b2-96a0-4ecd-9977-5cc2e1d9617e', 8.01, 11.54, 17.87, 57.0, '5-29-2323');

INSERT INTO publications.traffic_planning (stream_id, passages, start_date, end_date) VALUES 
   ('ba7ca89f-cdc9-4a8b-b1fd-8b82690063b3', '{
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
INSERT INTO refilling.ship (stream_id, name) VALUES 
	('f57991ba-de33-4d73-90bc-4123c8d4b3d4', 'Emma Mærsk');

INSERT INTO refilling.traffic_planning (stream_id, dock_name, arrival, departure) VALUES 
   ('e136b444-16a5-4dd9-aa96-575d3bfe9b76', 'D1', '6-8-2023', '6-11-2023');

INSERT INTO refilling.service (stream_id, traffic_planning_id, ship_id, needs_refuelling, needs_recharging) VALUES 
	('2bfed8b3-dcc2-40c2-9483-3f93f5bb9a28', 1, 1, false, true);

-- Security
INSERT INTO security.ship (stream_id, name, expected_cargo) VALUES 
	('b3c9a3e3-c157-43d0-bd6b-2c89ce5df30d', 'Emma Mærsk', 'Cars & Heavy Machinery'),
   ('768299ba-023b-4f99-9f96-55538d75b98a', 'Sovereign Mærsk', 'Bowling Balls');

INSERT INTO security.truck (stream_id, name, expected_cargo) VALUES 
   ('cc23df18-50f6-4fb7-a1b4-34e5706f8f75', 'VDL Bobbejan', 'Cars'),
   ('0969d005-fe47-45f2-ab6f-1554a6b0f937', 'VDL Wilhelmus', 'Cars'),
   ('260947e5-2165-45df-9b28-3756a45be468', 'VDL Bartholomeus', 'Cars');

INSERT INTO security.traffic_planning (stream_id, dock_name, arrival) VALUES 
   ('ce31baec-093a-4f63-bd12-6af700d80864', 'D1', '6-8-2023'),
   ('224fb7ca-5a08-440e-ac75-fd12eb4d5e93', 'D1', '6-7-2023'),
   ('eda38713-f764-487b-9e36-e388053caa39', 'D1', '6-10-2023'),
   ('bd938ede-37ae-4285-82e0-0b5c7b7c6d1a', 'D6', '6-7-2023'),
   ('a5863bed-12ed-4e15-a18a-e3cfc6a437a0', 'D6', '6-8-2023');

INSERT INTO security.inspection (stream_id, traffic_planning_id, ship_id, truck_id, supervisor, scheduled_for) VALUES 
   ('5dc3b9f6-3cb9-4ae1-a849-c6abf5ed58ed', 1, 1, NULL, 'Marcel de Groot', '6-9-2023'),
   ('27592e49-f912-4bdc-893a-4d292e58de4f', 2, NULL, 1, 'Robin Schellius', '6-7-2023'),
   ('210f1d59-b675-4871-9099-f7eadad8821c', 3, NULL, 2, 'Robin Schellius', '6-10-2023'),
   ('78d36bcd-e89b-4bda-ba85-0368d58958a1', 4, 2, NULL, 'Marcel de Groot', '6-7-2023'),
   ('6957abf0-b6cb-4fb3-aa3c-f986c40fdf98', 5, NULL, 3, 'Robin Schellius', '6-8-2023');

-- Traffic Control
INSERT INTO traffic_control.dock (stream_id, name, amount_of_ship_spots, amount_of_truck_spots) VALUES 
	('6eec1c7d-e037-4705-9eb9-f9d7aff7d6ee', 'D1', 1, 12),
	('f909af3b-be90-438b-96b3-e8213bf6dffe', 'D2', 1, 12),
	('e0856ee1-5326-43d6-b7d3-5e52f420326b', 'D3', 1, 12),
	('7aaaa7ce-867a-43bc-8b66-e6c268cb2ec3', 'D4', 3, 4),
	('1e15b2c1-cefa-4e94-a547-a46afdf9befb', 'D5', 1, 24),
	('50241451-88c0-40d6-8177-081fa66d3b01', 'D6', 1, 24),
	('f03af1bc-b38c-425f-96eb-3272a6d2769c', 'D7', 1, 24),
	('90046a52-68d1-4c58-8801-6bb93fe5b638', 'D8', 1, 24),
	('5531c08f-82cb-4755-b76f-836b9db9c6fc', 'D9', 2, 36);

INSERT INTO traffic_control.ship (stream_id, name, shipping_company_name, max_load_in_tonnage, length_in_m) VALUES 
   ('36f63a76-06fc-4071-b2cb-b4edf591626f', 'Estelle Mærsk', 'Maersk', 17079, 397),
	('778d86c6-6567-4774-9ff7-11427ebefa9f', 'Emma Mærsk', 'Maersk', 17079, 397),
	('f6053146-be7a-48ee-aa5e-d961873c4117', 'Sovereign Mærsk', 'Maersk', 9156, 346);

INSERT INTO traffic_control.truck (stream_id, name, shipping_company_name) VALUES 
   ('71ccc437-ec54-4af2-a194-49cfd8aab97e', 'VDL Bobbejan', 'Van der Linden Transport'),
   ('5e51c19b-510f-4b79-ba53-98f28ca474f8', 'VDL Wilhelmus', 'Van der Linden Transport'),
   ('b9abdd0a-6f04-467f-ac03-f05ac3671ea5', 'VDL Bartholomeus', 'Van der Linden Transport');

INSERT INTO traffic_control.tugboat (stream_id, name) VALUES 
   ('4e3f4cf1-6300-4551-a6d6-1005a1f1c854', 'De Stoomboot'),
   ('cbf50dbe-a042-4602-bcca-58dd8e09342f', 'Het Puttertje'),
   ('fdad6e0c-1149-4ac9-8280-ab782d352d5b', 'Jan'),
   ('13bc6ef3-3148-42ba-8f99-0e0466e33e7d', 'Ouwe Trekkert');

INSERT INTO traffic_control.passage (stream_id, dock_id, ship_id, truck_id, tugboats, arrival, departure) VALUES 
   ('20ac4eb1-7d7b-4844-ac61-58f712c8989b', 1, 2, NULL, '{
   "tugboats":[
      {
         "name":"Jan"
      },
      {
         "name":"Ouwe Trekkert"
      }
   ]}', '6-8-2023', '6-11-2023'),
   ('17087d30-8cb2-42b7-a229-8f6d42695446', 1, NULL, 1, '{}', '6-7-2023', '6-7-2023'),
   ('674f193b-c6a3-45db-a671-a14201a49ba6', 1, NULL, 2, '{}', '6-10-2023', '6-10-2023'),
   ('0675730c-b8d0-4d4a-a2e0-44aa2a83e161', 6, 3, NULL, '{
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
   ('6f08123d-4fdc-4bc6-9564-9588fe445f4b', 6, NULL, 3, '{}', '6-8-2023', '6-8-2023');

INSERT INTO traffic_control.traffic_planning (stream_id, passages, start_date, end_date) VALUES 
   ('59fddf0d-6e15-4487-92c8-2a37ce74367f', '{
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