BEGIN;
INSERT INTO
  "category" ("name", "color", "image")
VALUES
  (
    'informatique',
    '#a7fb1c',
    'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'
  ),
  (
    'cuisine',
    '#9cab4a',
    'https://cdn.pixabay.com/photo/2016/02/05/15/34/pasta-1181189_960_720.jpg'
  ),
  (
    'musique',
    '#7692b5',
    'https://cdn.pixabay.com/photo/2016/09/08/21/09/piano-1655558_960_720.jpg'
  ),
  (
    'sport',
    '#a7fb1c',
    'https://cdn.pixabay.com/photo/2015/05/26/23/52/technology-785742_960_720.jpg'
  ),
  (
    'cuisine',
    '#dad83a',
    'https://cdn.pixabay.com/photo/2015/07/11/14/53/plumbing-840835_960_720.jpg'
  ),
  (
    'jardinage',
    '#c8de01',
    'https://cdn.pixabay.com/photo/2020/04/06/11/22/seedling-5009286_1280.jpg'
  ),
  (
    'bien-être',
    '#a7927c',
    'https://cdn.pixabay.com/photo/2017/03/26/21/54/yoga-2176668_960_720.jpg'
  ),
  (
    'scolaire',
    '#31ff1b',
    'https://cdn.pixabay.com/photo/2015/09/02/12/28/pencil-918449_960_720.jpg'
  ),
  (
    'loisirs créatifs',
    '#437830',
    'https://cdn.pixabay.com/photo/2017/03/24/12/20/yarn-2171040_960_720.jpg'
  ),
  (
    'autre',
    '#cb9951',
    'https://cdn.pixabay.com/photo/2016/08/28/22/22/souk-1627045_960_720.jpg'
  );
INSERT INTO
  "role" ("name")
VALUES
  ('user'),
  ('admin');
INSERT INTO
  "location" ("latitude", "longitude")
VALUES
  (50.62925, -0.9882),
  (46.17569, -0.61201),
  (47.47805, 5.01476),
  (44.50522, 2.23951),
  (45.99509, 2.52986);
INSERT INTO
  "users" (
    "firstname",
    "lastname",
    "email",
    "password",
    "biography",
    "home_phone",
    "mobile_phone",
    "avatar_url",
    "role_id"
  )
VALUES
  (
    'Admin',
    'Mentorme',
    'admin@mentorme.fr',
    '$2b$10$VWPLkNQM6ZHsT2AvKzZILemRgGxZc048bOvv4YHSyv2dcRp3pjcdu',
    null,
    null,
    null,
    DEFAULT,
    2
  ),
  (
    'Jaymee',
    'Hankin',
    'jhankin0@ca.gov',
    'JG35BOWKQle',
    'Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est.Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.',
    0804904413,
    0939534832,
    DEFAULT,
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
    DEFAULT,
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
    DEFAULT,
    1
  ),
  (
    'Audry',
    'Milam',
    'amilam0@wikia.com',
    'Neqmu3',
    null,
    null,
    null,
    'https://robohash.org/temporadoloremqueest.png?size=100x100&set=set1',
    1
  ),
  (
    'Tam',
    'Kennagh',
    'tkennagh1@irs.gov',
    'pZJF0w9gW',
    null,
    null,
    0695986349,
    'https://robohash.org/iuremagniperspiciatis.png?size=100x100&set=set1',
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
    'ut rhoncus aliquet',
    '1:35',
    'In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',
    false,
    false,
    true,
    4,
    7,
    1
  ),
  (
    'in imperdiet et',
    '0:05',
    'Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl.',
    true,
    false,
    true,
    4,
    8,
    2
  ),
  (
    'consequat dui nec',
    '3:13',
    'Proin risus.',
    false,
    true,
    false,
    2,
    6,
    3
  ),
  (
    'luctus tincidunt nulla',
    '2:28',
    'Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst. Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.',
    true,
    false,
    true,
    4,
    3,
    4
  ),
  (
    'fermentum donec ut',
    '2:05',
    'Curabitur convallis.',
    true,
    true,
    false,
    1,
    7,
    5
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