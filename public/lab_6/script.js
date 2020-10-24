/* eslint-disable linebreak-style */

function getRandomInt(max) {
  // src: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
  return Math.floor(Math.random() * Math.floor(max));
}

function range(int) {
  const arr = [];
  for (let i = 0; i < int; i += 1) {
    arr.push(i);
  }
  return arr;
}

function sortByKey(a, b, key) {
  if (a[key] < b[key]) {
    return -1;
  }
  if (a[key] > b[key]) {
    return 1;
  }
  return 0;
}

document.body.addEventListener('submit', async (e) => {
  e.preventDefault(); // this stops whatever the browser wanted to do itself.
  const form = $(e.target).serializeArray(); // here we're using jQuery to serialize the form
  fetch('/api', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  })
    .then((fromServer) => fromServer.json())
    .then((fromServer) => {
      // You're going to do your lab work in here. Replace this comment.
      if (document.querySelector('.flex-inner')) {
        document.querySelector('.flex-inner').remove();
      }
      const myArr = range(10);
      const myArr1 = myArr.map(() => {
        const num = getRandomInt(243); // uses 243 to match the number of countries in the JSON file
        return fromServer[num];
      });

      const reverseList = myArr1.sort((a, b) => sortByKey(b, a, 'name'));
      const finalList = document.createElement('ol');
      finalList.className = 'flex-inner';
      $('form').append(finalList);

      reverseList.forEach((lmnt, i) => {
        const li = document.createElement('li');
        $(li).append(
          `<input type = "checkbox" value = ${lmnt.code} id = ${lmnt.code} />`
        );
        $(li).append(`<label for = ${lmnt.code}> ${lmnt.name}</label>`);
        $(finalList).append(li);
      });
      console.log('fromServer', fromServer);
    })
    .catch((err) => console.log(err));
});
