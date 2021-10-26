BEGIN;
INSERT INTO
  "category" ("name", "color")
VALUES
  ('sport', '#ff7f00'),
  ('tricot', '#7F00ff'),
  ('informatique', '#9e9e9e');
INSERT INTO
  "role" ("name")
VALUES
  ('user'),
  ('admin');
INSERT INTO
  "location" ("latitude", "longitude")
VALUES
  (50.62925, 3.057256),
  (48.8534, 2.3488),
  (44.8378, -0.594);
INSERT INTO
  "user" (
    "firstname",
    "lastname",
    "email",
    "password",
    "biography",
    "home_phone",
    "mobile_phone",
    "role_id"
  )
VALUES
  (
    'Jaymee',
    'Hankin',
    'jhankin0@ca.gov',
    'JG35BOWKQle',
    'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    0804904413,
    0939534832,
    1
  ),
  (
    'Derward',
    'Abramzon',
    'dabramzon1@surveymonkey.com',
    'j57vgOZ7m98',
    '',
    0117645913,
    0204517172,
    1
  ),
  (
    'Robert',
    'Tenman',
    'rtenman2@google.com.hk',
    'NMUVpSZ0j',
    'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    0779837770,
    0695986349,
    1
  );
INSERT INTO
  "service" (
    "title",
    "duration",
    "description",
    "online",
    "irl",
    "is_published",
    "user_id",
    "category_id",
    "location_id"
  )
VALUES
  (
    'cours de chant',
    '2 hours',
    'cours de chant lyrique blabla',
    false,
    true,
    false,
    3,
    2,
    2
  ),(
    'piano',
    '1 hour',
    'cours de piano blabla',
    false,
    false,
    false,
    3,
    1,
    1
  ),(
    'HTML/CSS',
    '5 hours',
    'revoir les bases HTML/CSS',
    true,
    true,
    false,
    2,
    1,
    2
  );
INSERT INTO
  "user_likes_service" ("user_id", "service_id")
VALUES
  (1, 2),
  (1, 3),
  (2, 2),
  (2, 1),
  (2, 3);
COMMIT;