(function() {
    const bannersArray = Array.from(document.querySelectorAll('.banner'));
    const buttonEnable = document.getElementById('btn-enable');
    const buttonDisable = document.getElementById('btn-disable');
    const textBlockArray = Array.from(document.querySelectorAll('.text-block'));
    let bannersTopPosition = [];

    function recalculateNannersPosition() {
        bannersTopPosition = [];
        for (let i = 0; i < bannersArray.length; i++) {
            bannersTopPosition.push(bannersArray[i].offsetTop);
        }
    }

    recalculateNannersPosition();

    for (let i = 1; i < bannersArray.length - 1; i += 2) {
        bannersArray[i].style.backgroundColor = 'grey';
    }

    let bannerChanger = function() {
        for (let i = 0; i < bannersTopPosition.length; i++){
            if (window.scrollY >= bannersTopPosition[i]) {
                textBlockArray[i].style.paddingTop = bannersArray[i].offsetHeight + 15 + 'px';
                bannersArray[i].classList.add('positionFixed');
            } else {
                textBlockArray[i].style.paddingTop = '15px';
                bannersArray[i].classList.remove('positionFixed');
            }
        }
    }

    function removeAllBanners() {
        for (let i = 0; i < bannersTopPosition.length; i++){
            textBlockArray[i].style.paddingTop = '15px';
            bannersArray[i].classList.remove('positionFixed');
        }
    }
    
    window.addEventListener('resize', function(){
        removeAllBanners();
        recalculateNannersPosition();
    });
    
    buttonEnable.addEventListener('click', function() {
        document.addEventListener('scroll', bannerChanger);
        bannerChanger();
    })
    
    buttonDisable.addEventListener('click', function() {
        document.removeEventListener('scroll', bannerChanger);
        removeAllBanners();
    })
})();