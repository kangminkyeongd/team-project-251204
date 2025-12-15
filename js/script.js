document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const emotionSelect = document.getElementById('emotion-select');
    const diaryInput = document.getElementById('diary-text');
    const snowflakeHiddenInput = document.getElementById('snowflake-choice');
    const diaryList = document.getElementById('diary-list');
    const historySection = document.getElementById('history-section'); 

    const snowOptions = document.querySelectorAll('.snow-option');

    // 눈송이 이미지 클릭 시 선택 처리
    snowOptions.forEach(option => {
        option.addEventListener('click', () => {
            snowOptions.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            snowflakeHiddenInput.value = option.getAttribute('data-value');
        });
    });

    // 감정별 설정 (배경색 클래스 매핑)
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

    // 🔴 핵심: 배경색 변경 함수
    function updateBackground() {
        const config = emotionConfig[emotionSelect.value];
        
        // 기존 클래스 모두 제거하고 깨끗한 상태로 만듦
        appContainer.className = ''; 
        // 혹시 모르니 ID 다시 부여
        appContainer.id = 'app-container'; 
        
        // 새로운 감정 배경 클래스 추가
        if (config && config.bg) {
            appContainer.classList.add(config.bg);
        }
    }

    // 🔴 이벤트 연결: 감정 선택이 바뀔 때마다 updateBackground 실행
    emotionSelect.addEventListener('change', updateBackground);
    
    // 페이지 로드시 초기 상태 한 번 실행 (처음 '무난' 상태 적용)
    updateBackground();


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

        // 1. 병 안에 눈송이 투하
        let snowCount = (selectedEmotionValue === 'gloomy') ? 5 : 1; 
        for (let i = 0; i < snowCount; i++) {
            createSnowflake(config, snowImageSrc);
        }

        // 2. 아래쪽 리스트에 일기 추가
        addDiaryEntry(selectedEmotionText, diaryInput.value, snowImageSrc);

        // 3. 입력창 비우기
        diaryInput.value = ""; 

        // 4. 화면 자동 스크롤
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
