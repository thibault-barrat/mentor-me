// Npm Import
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Local import
import ServicesList from 'src/components/ServicesList';
// import data from "src/data/services";

// Style
import './style.scss';

export default function Services() {
  // Here we get the initial state from the reducer
  const servicesState = useSelector((state) => state.services.items);

  // We use useParams to get the params id from the path on App.js
  const { id } = useParams();

  // We want to show every services for each categories
  // so we need to compare if the service's category_id is = to the category's id
  const services = servicesState.filter((item) => item.category_id === parseInt(id, 10));

  if (services.length == 0) {
    return (
      <p className="empty-list">La catégorie dispose d'aucun échange de compétence pour le moment.</p>
    );
  }

  return (
    <ServicesList
      services={services}
      title="Voici les offres correspondantes à la catégorie"
    />
  );
}
