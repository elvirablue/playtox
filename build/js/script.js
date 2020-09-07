document.addEventListener("DOMContentLoaded",() => {

  let buttonAttack = document.querySelector('.control[data-button-attack]');
  let buttonSkills = document.querySelector('.control[data-button-skills]');
  let unitZombie = document.querySelector('.unit[data-zombie]');

  buttonAttack.addEventListener( "click" , () => {
    unitZombie.classList.add('unit--animated-attack');

    setTimeout(() =>
      unitZombie.classList.remove('unit--animated-attack'), 600);
  });

  buttonSkills.addEventListener( "click" , () => {
    let classZombie = unitZombie.classList.contains('unit--rage') ? 'unit--animated-add-rage' : 'unit--animated-remove-rage';
    unitZombie.classList.add(classZombie);

    setTimeout(() =>
    {
      unitZombie.classList.remove(classZombie);
      unitZombie.classList.toggle('unit--rage');
      unitZombie.querySelector('.unit__effect').classList.toggle('unit__effect--active');

    }, 1500);
  });
});
