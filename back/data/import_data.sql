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
    'https://cdn.pixabay.com/photo/2017/05/25/15/08/jogging-2343558_960_720.jpg'
  ),
  (
    'bricolage',
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
  (44.8378, -0.594),
  (48.693829, 6.182534),
  (47.747, 5.732),
  (-22.2355, 166.47),
  (50.62925, 3.057256),
  (45.764043, 4.835659),
  (49.258329, 4.031696),
  (48.8534, 2.3488);
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
    'Cedric',
    'Hinton',
    'cedric.hinton@icloud.fr',
    'XUE42MEW2YE',
    'Bonjour, je m''appelle Cédric, jeune retraité anciennement professeur de lettres. Toujours partant pour un partage de connaissances et pourquoi pas aider les plus jeunes!',
    '+33804904413',
    '+4210639534832',
    'https://i.imgur.com/IzU9WmJ.jpg',
    1
  ),
  (
    'Lucius',
    'Burke',
    'dabramzon1@surveymonkey.com',
    'j57vgOZ7m98',
    'Hello',
    '+33117645913',
    '+41704517172',
    'https://i.imgur.com/bx5KNBH.jpg',
    1
  ),
  (
    'Robert',
    'Tenman',
    'rtenman2@google.com.hk',
    'NMUVpSZ0j',
    'Grand fan de moto et d''échecs!',
    '+33779837770',
    '+33695986349',
    'https://i.imgur.com/af4O77d.jpg',
    1
  ),
  (
    'Audry',
    'Milam',
    'amilam0@wikia.com',
    'Neqm$u3',
    'Passionnée par la couture et les DIY.',
    null,
    null,
    'https://i.imgur.com/oBAFKQr.jpg',
    1
  ),
  (
    'Tam',
    'Kennagh',
    'tkennagh1@irs.gov',
    'pZJF0w9gW$',
    null,
    null,
    '+33695986349',
    'https://i.imgur.com/aJN0be7.jpg',
    1
  ),
  (
    'Gérard',
    'Lerju',
    'gegelju@gmail.com',
    'p$ZJF0wgegesg9gW',
    'Première visite sur ce site! je teste le concept',
    null,
    '+641695986',
    'https://i.imgur.com/zxaTTAh.jpg',
    1
  ),
  (
    'Kate',
    'Fuentes',
    'k.fuentes@outlook.fr',
    'pZJF0w9gffgegbcf$W',
    '',
    null,
    '+33694584749',
    'https://i.imgur.com/OWDVzLD.jpg',
    1
  ),
  (
    'Flavia',
    'Maldonad',
    'flavDo@outlook.fr',
    'pZgegzDFGE4$fgegbcfW',
    '',
    null,
    '+33694584749',
    'https://i.imgur.com/umN24bq.jpg',
    1
  ),
  (
    'Alexa',
    'Henri',
    'alex.henri@gmail.com',
    'pZJF0w$15fegsvgs3$',
    'Hello tout le monde moi c''est Alexa',
    null,
    '+33694584749',
    'https://i.imgur.com/ARzzL9Q.jpg',
    1
  ),
  (
    'Margot',
    'Deschamps',
    'margotdes@outlook.fr',
    'p$fgzERE5469$gffgegbcfW',
    '',
    null,
    '+33694584749',
    'https://i.imgur.com/tio3EDE.jpg',
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
    'Cours d''anglais',
    60,
    'Vous avez besoin de l''anglais pour des examens ? une validation de diplôme ? un changement de carrière ? N''hésitez pas à me contacter! Je suis disponible pour des cours du soir et/ou en weekend!',
    true,
    false,
    true,
    8,
    8,
    8
  ),
  (
    'Coach fitness',
    45,
    'Je dispose d''une salle de sport privée avec tous les appareils nécessaires. Je vous propose 45min de séance gratuite. Disponibilité à discuter ensemble!',
    false,
    true,
    true,
    6,
    4,
    2
  ),
  (
    'Tonte de pelouses, taille de haie',
    60,
    'Si tu en as marre de passer ton temps à faire ton jardin, contacte-moi! Bonne humeur garantie!',
    false,
    true,
    false,
    4,
    6,
    3
  ),
  (
    'Aménagement et entretien d''un jardin',
    120,
    'Semis, plantation, tonte et mise en compostage, taille de haie',
    false,
    true,
    true,
    3,
    6,
    7
  ),
  (
    'Découverte du golf',
    90,
    '1heure30 pour découvrir le golf en pratiquant!',
    false,
    true,
    false,
    9,
    4,
    8
  ),
  (
    'Couture',
    75,
    'Agrandir, rétrécir, pose de fermeture éclair, confection de vêtements, ourlets... Je propose des tutos en vidéos ou des explications autour d''un bon thé chaud!',
    true,
    true,
    false,
    5,
    9,
    3
  ),
  (
    'Cours de guitare',
    60,
    'Je peux donner des cours de guitare à des débutants',
    false,
    true,
    false,
    3,
    3,
    4
  ),
  (
    'Cours de solfège',
    60,
    'Je peux vous aider à apprendre le solfège',
    false,
    true,
    false,
    3,
    3,
    4
  ),
  (
    'Cours de piano débutant',
    60,
    'Je peux donner des cours de guitare à des débutants',
    true,
    true,
    false,
    3,
    3,
    4
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