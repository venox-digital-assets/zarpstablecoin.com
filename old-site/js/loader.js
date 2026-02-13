let body = document.querySelector('body');  

function animate(){
  window.addEventListener('load', function(event) {
    body.classList.add('website-loaded');
    body.classList.add('website-loaded-anim');
  });
}

animate();


function mobileNav(){
  const buttonSecond = document.querySelector('.menu-container');

  function testOnce() {
    console.log(this.textContent);
    //window.alert('test');
  }

  buttonSecond.addEventListener('click', testOnce, { once: true });


}

//mobileNav();