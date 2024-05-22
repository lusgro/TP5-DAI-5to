INSERT INTO users (first_name, last_name, username, password)
VALUES ('Juan', 'Pérez', 'juanperez', 'contraseña123'),
       ('María', 'González', 'mariagonzalez', 'abc@123'),
       ('Carlos', 'López', 'carloslopez', 'usuario123');
	   
INSERT INTO provinces (name, full_name, latitude, longitude, display_order)
VALUES ('CABA', 'Ciudad Autónoma de Buenos Aires', -34.6037, -58.3816, 1),
       ('Buenos Aires', 'Provincia de Buenos Aires', -34.9215, -57.9545, 2),
       ('Córdoba', 'Provincia de Córdoba', -31.4201, -64.1888, 3),
       ('Santa Fe', 'Provincia de Santa Fe', -31.6107, -60.6973, 4),
       ('Mendoza', 'Provincia de Mendoza', -32.8895, -68.8458, 5),
       ('Tucumán', 'Provincia de Tucumán', -26.8083, -65.2176, 6),
       ('Entre Ríos', 'Provincia de Entre Ríos', -30.9516, -59.3414, 7),
       ('Salta', 'Provincia de Salta', -24.7829, -65.4122, 8),
       ('Chaco', 'Provincia de Chaco', -26.3864, -60.7658, 9),
       ('Corrientes', 'Provincia de Corrientes', -27.4691, -58.8309, 10),
       ('Misiones', 'Provincia de Misiones', -27.3621, -55.9009, 11),
       ('San Juan', 'Provincia de San Juan', -31.5375, -68.5364, 12),
       ('Jujuy', 'Provincia de Jujuy', -24.1857, -65.2995, 13),
       ('Corrientes', 'Provincia de Corrientes', -27.4691, -58.8309, 14),
       ('Formosa', 'Provincia de Formosa', -26.1775, -58.1781, 15),
       ('La Rioja', 'Provincia de la Rioja', -29.4131, -66.8558, 16),
       ('Neuquén', 'Provincia de Neuquén', -38.9517, -68.059, 17),
       ('Río Negro', 'Provincia de Río Negro', -40.8135, -62.9967, 18),
       ('San Luis', 'Provincia de San Luis', -33.3017, -66.3378, 19),
       ('Santa Cruz', 'Provincia de Santa Cruz', -51.6226, -69.2181, 20),
       ('Santiago del Estero', 'Provincia de Santiago del Estero', -27.7951, -64.2615, 21),
       ('Tierra del Fuego', 'Provincia de Tierra del Fuego, Antártida e Islas del Atlántico Sur', -54.8078, -68.307, 22),
       ('Chubut', 'Provincia del Chubut', -43.2997, -65.1023, 23),
       ('Catamarca', 'Provincia de Catamarca', -28.4696, -65.7852, 24);

INSERT INTO locations (name, id_province, latitude, longitude)
VALUES ('Lugar A', 1, -34.6037, -58.3816),
       ('Lugar B', 2, -32.9478, -60.6557),
       ('Lugar C', 3, -31.4201, -64.1888);

INSERT INTO event_locations (name, id_location, full_address, max_capacity, latitude, longitude, id_creator_user)
VALUES ('Locación Evento 1', 1, 'Av. Corrientes 123', 100, -34.6037, -58.3816, 1),
       ('Locación Evento 2', 2, 'Av. Rivadavia 456', 150, -32.9478, -60.6557, 2),
       ('Locación Evento 3', 3, 'Av. Colón 789', 200, -31.4201, -64.1888, 3);

INSERT INTO event_categories (name, display_order)
VALUES ('Concierto', 1),
       ('Conferencia', 2);

INSERT INTO events (name, description, id_event_category, id_event_location, start_date, duration_in_minutes, price, enabled_for_enrollment, max_assistance, id_creator_user)
VALUES ('Concierto de Rock', 'Concierto de bandas locales', 1, 1, '2024-05-15 18:00:00', 120, 500.00, TRUE, 100, 1),
       ('Conferencia de Tecnología', 'Últimas tendencias en inteligencia artificial', 2, 2, '2024-06-01 10:00:00', 90, 0.00, TRUE, 50, 2);

INSERT INTO tags (name) VALUES ('Música'), ('Tecnología');

INSERT INTO events_tags (id_event, id_tag)
VALUES (1, 1),
       (2, 2);

INSERT INTO events_enrollments (id_event, id_user, description, registration_date_time, attended, observations, rating)
VALUES (1, 1, '¡Emocionado por el concierto!', '2024-05-10 14:00:00', TRUE, NULL, 4.5),
       (2, 2, 'Interesado en aprender nuevas tecnologías', '2024-05-10 15:30:00', FALSE, 'Llegué tarde', NULL);