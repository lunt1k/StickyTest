(function () {
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

    let bannerChanger = function () {
        for (let i = 0; i < bannersTopPosition.length; i++) {
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
        for (let i = 0; i < bannersTopPosition.length; i++) {
            textBlockArray[i].style.paddingTop = '15px';
            bannersArray[i].classList.remove('positionFixed');
        }
    }

    function debounce(func, ms) {
        let isCooldown = false;
        
        return function() {
            if (isCooldown) return;

            func.apply(this, arguments);
            isCooldown = true;
            setTimeout(() => isCooldown = false, ms);
        };
        
    }

    // let initialize = function () {
    //     document.addEventListener('scroll', bannerChanger);
    //     bannerChanger();
    // }

    let debouncedBannerChanger = debounce(bannerChanger, 100); 

    let initialize = function () {
        document.addEventListener('scroll', debouncedBannerChanger);
    }

    let disable = function () {
        document.removeEventListener('scroll', debouncedBannerChanger);
        removeAllBanners();
    }

    window.addEventListener('resize', debounce(removeAllBanners, 100))
    window.addEventListener('resize', debounce(recalculateNannersPosition, 100));
    // window.addEventListener('resize', function () {
    //     removeAllBanners();
    //     recalculateNannersPosition();
    // });

    buttonEnable.addEventListener('click', initialize);
    buttonDisable.addEventListener('click', disable);
    
})();

