export default function(server) {

  /*
    Seed your development database using your factories.
    This data will not be loaded in your tests.
  */

  // server.createList('post', 10);

  let prescriber1 = server.create('prescriber');
  let prescriber2 = server.create('prescriber');
  let prescriber3 = server.create('prescriber');
  let prescriber4 = server.create('prescriber');
  let prescriber5 = server.create('prescriber');
  let prescriber6 = server.create('prescriber');

  server.createList('medication', 4, { prescriber: prescriber1 });
  server.createList('medication', 4, { prescriber: prescriber2 });
  server.createList('medication', 4, { prescriber: prescriber3 });
  server.createList('medication', 4, { prescriber: prescriber4 });
  server.createList('medication', 4, { prescriber: prescriber5 });
  server.createList('medication', 4, { prescriber: prescriber6 });
}
