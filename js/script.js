document.addEventListener('DOMContentLoaded', () => {
    // 요소 가져오기
    const appContainer = document.getElementById('app-container');
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const emotionSelect = document.getElementById('emotion-select');
    const diaryInput = document.getElementById('diary-text');
    const snowflakeHiddenInput = document.getElementById('snowflake-choice');
    const diaryList = document.getElementById('diary-list');
    const historySection = document.getElementById('history-section');
    
    // 🎵 음악 관련 요소
    const audio = document.getElementById('bgm');
    const soundBtn = document.getElementById('sound-btn');
    const iconOn = document.getElementById('icon-on');
    const iconOff = document.getElementById('icon-off');

    // ❄️ 배경 눈 관련 요소
    const bgSnowContainer = document.getElementById('bg-snow-container');
    const snowOptions = document.querySelectorAll('.snow-option');

    // 눈송이 이미지 클릭 시 선택 처리
    snowOptions.forEach(option => {
        option.addEventListener('click', () => {
            snowOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            snowflakeHiddenInput.value = option.getAttribute('data-value');
        });
    });

    const emotionConfig = {
        'happy':   { bg: 'bg-happy',   anim: 'anim-happy',   size: 'small' },
        'flutter': { bg: 'bg-flutter', anim: 'anim-flutter', size: 'various' },
        'peace':   { bg: 'bg-peace',   anim: 'anim-peace',   size: 'fixed' },
        'normal':  { bg: 'bg-normal',  anim: 'anim-normal',  size: 'fixed' },
        'complex': { bg: 'bg-complex', anim: 'anim-complex', size: 'irregular'},
        'tired':   { bg: 'bg-tired',   anim: 'anim-tired',   size: 'large' },
        'gloomy':  { bg: 'bg-gloomy',  anim: 'anim-gloomy',  size: 'small' },
        'annoyed': { bg: 'bg-annoyed', anim: 'anim-annoyed', size: 'small' },
        'cold':    { bg: 'bg-cold',    anim: 'anim-cold',    size: 'small' },
        'lonely':  { bg: 'bg-lonely',  anim: 'anim-lonely',  size: 'small' }
    };

    function updateBackground() {
        const config = emotionConfig[emotionSelect.value];
        appContainer.className = ''; 
        appContainer.id = 'app-container'; 
        if (config && config.bg) appContainer.classList.add(config.bg);
    }
    
    emotionSelect.addEventListener('change', updateBackground);
    updateBackground(); 

    // 🎵 음악 버튼 클릭 기능
    soundBtn.addEventListener('click', () => {
        if (audio.paused) {
            // 음악이 멈춰있으면 -> 재생
            audio.play();
            iconOn.classList.remove('hidden'); // 소리 아이콘 보이기
            iconOff.classList.add('hidden');   // 음소거 아이콘 숨기기
        } else {
            // 음악이 나오고 있으면 -> 일시정지
            audio.pause();
            iconOn.classList.add('hidden');    // 소리 아이콘 숨기기
            iconOff.classList.remove('hidden');// 음소거 아이콘 보이기
        }
    });

    // ❄️ 배경에 눈 내리는 기능
    function createBgSnowflake() {
        const flake = document.createElement('div');
        flake.classList.add('bg-snowflake');
        const size = Math.random() * 5 + 2 + 'px'; 
        flake.style.width = size;
        flake.style.height = size;
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.opacity = Math.random();
        flake.style.animationDuration = Math.random() * 3 + 2 + 's';
        bgSnowContainer.appendChild(flake);
        setTimeout(() => { flake.remove(); }, 5000); 
    }
    setInterval(createBgSnowflake, 200);

    // 저장 버튼 클릭
    saveButton.addEventListener('click', () => {
        if (diaryInput.value.trim() === "") {
            alert("오늘의 감정을 기록해주세요!");
            diaryInput.focus();
            return;
        }

        const selectedEmotionValue = emotionSelect.value;
        const selectedEmotionText = emotionSelect.options[emotionSelect.selectedIndex].text;
        const config = emotionConfig[selectedEmotionValue] || emotionConfig['normal'];
        const snowImageSrc = snowflakeHiddenInput.value;

        let snowCount = (selectedEmotionValue === 'gloomy') ? 5 : 1; 
        for (let i = 0; i < snowCount; i++) {
            createSnowflake(config, snowImageSrc);
        }

        addDiaryEntry(selectedEmotionText, diaryInput.value, snowImageSrc);
        diaryInput.value = ""; 

        setTimeout(() => {
            historySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    });

    function createSnowflake(config, imgSrc) {
        const newSnowflake = document.createElement('img');
        newSnowflake.src = imgSrc;
        newSnowflake.style.position = 'absolute';
        
        let size = 30; 
        if (config.size === 'small') size = 20;            
        else if (config.size === 'large') size = 50;       
        else if (config.size === 'various') size = Math.random() * 30 + 15; 
        else if (config.size === 'irregular') size = Math.random() > 0.5 ? 15 : 45; 

        newSnowflake.style.width = `${size}px`;
        newSnowflake.style.height = `${size}px`;
        newSnowflake.style.left = Math.random() * 90 + '%';
        newSnowflake.style.bottom = Math.random() * 80 + '%';
        newSnowflake.classList.add(config.anim);
        snowPile.appendChild(newSnowflake);
    }

    function addDiaryEntry(emotionText, text, imageSrc) {
        const now = new Date();
        const dateString = now.toLocaleDateString('ko-KR', { 
            year: 'numeric', month: 'long', day: 'numeric', 
            weekday: 'short', hour: '2-digit', minute: '2-digit' 
        });

        const card = document.createElement('div');
        card.className = 'diary-card';
        card.innerHTML = `
            <img src="${imageSrc}" alt="눈송이">
            <div class="diary-info">
                <div class="diary-date">${dateString}</div>
                <div class="diary-emotion">${emotionText}</div>
                <div class="diary-content">${text}</div>
            </div>
        `;
        diaryList.prepend(card);
    }
});
