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
    
    // 🎵 음악 요소
    const audio = document.getElementById('bgm');
    const soundBtn = document.getElementById('sound-btn');
    const iconOn = document.getElementById('icon-on');
    const iconOff = document.getElementById('icon-off');

    // ❄️ 배경 눈 컨테이너
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
        // 음악 파일이 로드되지 않았을 때 체크
        if(audio.error) {
            alert("음악 파일을 찾을 수 없습니다. assets 폴더를 확인해주세요!");
            return;
        }

        if (audio.paused) {
            // 재생 시도
            const playPromise = audio.play();
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    iconOn.classList.remove('hidden'); 
                    iconOff.classList.add('hidden');
                })
                .catch(error => {
                    console.log("재생 오류:", error);
                    alert("음악을 재생할 수 없습니다. 파일을 확인해주세요.");
                });
            }
        } else {
            audio.pause();
            iconOn.classList.add('hidden');    
            iconOff.classList.remove('hidden');
        }
    });

    // ❄️ 배경에 눈 내리는 기능 (화면 전체)
    function createBgSnowflake() {
        if(!bgSnowContainer) return; // 에러 방지

        const flake = document.createElement('div');
        flake.classList.add('bg-snowflake');
        
        // 크기 3~8px
        const size = Math.random() * 5 + 3 + 'px'; 
        flake.style.width = size;
        flake.style.height = size;
        
        // 위치 랜덤
        flake.style.left = Math.random() * 100 + 'vw';
        
        // 애니메이션 속도 3~6초
        flake.style.animationDuration = Math.random() * 3 + 3 + 's';
        
        bgSnowContainer.appendChild(flake);
        
        // 6초 뒤 삭제
        setTimeout(() => { flake.remove(); }, 6000); 
    }
    
    // 0.2초마다 눈 생성
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
