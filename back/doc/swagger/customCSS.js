module.exports = `
  .swagger-ui .topbar {
    display: none
  }
  .swagger-ui .opblock.opblock-patch .opblock-summary-method {
    background-color: #9063cd;
  }
  .swagger-ui .opblock.opblock-patch .opblock-summary {
    border-color: #9063cd;
  }
  .swagger-ui .opblock.opblock-patch {
    background: rgba(144,99,205,.1);
    border-color: #9063cd;
  }
  .swagger-ui .opblock .opblock-summary-description {
    text-align: right;
    margin-right: 1rem;
  }

  .swagger-ui section.models.is-open {
    display: none;
  }
`;
