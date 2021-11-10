BEGIN;
-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS "users",
"service",
"user_likes_service",
"category",
"location",
"user_likes_service",
"role",
"refreshtokens";
DROP DOMAIN IF EXISTS "phone_number";
-- Création d'un domaine
CREATE DOMAIN "phone_number" AS text CHECK (
  VALUE ~ '((?:\+|00)[17](?: |\-)?|(?:\+|00)[1-9]\d{0,2}(?: |\-)?|(?:\+|00)1\-\d{3}(?: |\-)?)?(0\d|\([0-9]{3}\)|[1-9]{0,3})(?:((?: |\-)[0-9]{2}){4}|((?:[0-9]{2}){4})|((?: |\-)[0-9]{3}(?: |\-)[0-9]{4})|([0-9]{7}))'
);
-- Création de la table user
CREATE TABLE "users" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  firstname TEXT NOT NULL,
  lastname TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  biography TEXT,
  home_phone phone_number,
  mobile_phone phone_number,
  role_id INT NOT NULL DEFAULT 1,
  -- par défaut, l' avatar du user sera le logo de mentor.me
  avatar_url TEXT NOT NULL DEFAULT 'https://i.imgur.com/Z9fVYeP.png',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
-- Création de la table service
CREATE TABLE "service" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title TEXT NOT NULL,
  duration INT NOT NULL,
  description text NOT NULL,
  online BOOLEAN NOT NULL DEFAULT FALSE,
  irl BOOLEAN NOT NULL DEFAULT FALSE,
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  user_id int NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  category_id INT NOT NULL,
  location_id INT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--Création de la table user_likes_service
CREATE TABLE "user_likes_service" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id int NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  service_id int NOT NULL REFERENCES "service"("id") ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--Création de la table category
CREATE TABLE "category" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--Création de location
CREATE TABLE "location" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  latitude NUMERIC NOT NULL,
  longitude NUMERIC NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--Création de role
CREATE TABLE "role" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
--Création d'une table token
CREATE TABLE "refreshtokens" (
  id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  refreshtoken TEXT NOT NULL UNIQUE
);
--Ajout du type FOREIGN KEYS aux clés étrangères
ALTER TABLE
  "users"
ADD
  CONSTRAINT user_fk FOREIGN KEY ("role_id") REFERENCES "role"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE
  "service"
ADD
  CONSTRAINT service_fk1 FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE CASCADE;
ALTER TABLE
  "service"
ADD
  CONSTRAINT service_fk2 FOREIGN KEY ("location_id") REFERENCES "location"("id") ON DELETE CASCADE;
COMMIT;