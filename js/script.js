document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const snowflakeSelect = document.getElementById('snowflake-choice');
    const emotionSelect = document.getElementById('emotion-select');
    const diaryInput = document.getElementById('diary-text');

    // 🔴 [핵심] 표 내용을 코드로 옮긴 설정값 (Configuration)
    const emotionConfig = {
        'happy':   { bg: 'bg-happy',   anim: 'anim-happy',   size: 'small' },   // 따뜻함: 작음
        'flutter': { bg: 'bg-flutter', anim: 'anim-flutter', size: 'various' }, // 설렘: 다양함
        'peace':   { bg: 'bg-peace',   anim: 'anim-peace',   size: 'fixed' },   // 평온: 일정
        'normal':  { bg: 'bg-normal',  anim: 'anim-normal',  size: 'fixed' },   // 무난: 기본
        'complex': { bg: 'bg-complex', anim: 'anim-complex', size: 'irregular'},// 복잡: 불규칙
        'tired':   { bg: 'bg-tired',   anim: 'anim-tired',   size: 'large' },   // 피곤: 큼
        'gloomy':  { bg: 'bg-gloomy',  anim: 'anim-gloomy',  size: 'small' },   // 우울: 작음
        'annoyed': { bg: 'bg-annoyed', anim: 'anim-annoyed', size: 'small' },   // 짜증: 작음
        'cold':    { bg: 'bg-cold',    anim: 'anim-cold',    size: 'small' },   // 차가움: 작음
        'lonely':  { bg: 'bg-lonely',  anim: 'anim-lonely',  size: 'small' }    // 외로움: 적음(작음)
    };

    // 1. 감정 선택할 때마다 배경색 즉시 바꾸기
    emotionSelect.addEventListener('change', () => {
        const selectedEmotion = emotionSelect.value;
        const config = emotionConfig[selectedEmotion];

        // 기존 배경 클래스 다 지우고
        appContainer.className = ''; 
        appContainer.id = 'app-container'; // ID 유지
        
        // 새로운 배경 클래스 추가
        if (config && config.bg) {
            appContainer.classList.add(config.bg);
        }
    });

    // 2. 버튼 클릭 시 눈송이 담기
    saveButton.addEventListener('click', () => {
        if (diaryInput.value.trim() === "") {
            alert("오늘의 감정을 기록해주세요!");
            diaryInput.focus();
            return;
        }

        const selectedEmotion = emotionSelect.value;
        const config = emotionConfig[selectedEmotion] || emotionConfig['normal'];
        
        // 🔴 표에 따른 눈송이 갯수 조절 (우울함은 '눈 많음', 외로움은 '적음')
        let snowCount = 1; 
        if (selectedEmotion === 'gloomy') snowCount = 5; // 우울함: 한 번에 5개 투하
        if (selectedEmotion === 'lonely') snowCount = 1; 

        // 눈송이 갯수만큼 반복 생성
        for (let i = 0; i < snowCount; i++) {
            createSnowflake(config);
        }

        diaryInput.value = ""; // 입력창 초기화
    });

    // 눈송이 만드는 함수
    function createSnowflake(config) {
        const newSnowflake = document.createElement('img');
        newSnowflake.src = snowflakeSelect.value;
        newSnowflake.style.position = 'absolute';
        
        // 🔴 표에 따른 크기(Size) 결정 로직
        let size = 30; // 기본값
        if (config.size === 'small') size = 20;            // 작음
        else if (config.size === 'large') size = 50;       // 큼
        else if (config.size === 'various') size = Math.random() * 30 + 15; // 다양 (15~45)
        else if (config.size === 'irregular') size = Math.random() > 0.5 ? 15 : 45; // 불규칙 (아주 작거나 아주 크거나)

        newSnowflake.style.width = `${size}px`;
        newSnowflake.style.height = `${size}px`;
        
        // 위치 랜덤 잡기
        newSnowflake.style.left = Math.random() * 90 + '%';
        newSnowflake.style.bottom = Math.random() * 80 + '%';
        
        // 애니메이션 클래스 붙이기
        newSnowflake.classList.add(config.anim);

        snowPile.appendChild(newSnowflake);
    }
});
