document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const emotionSelect = document.getElementById('emotion-select');
    const diaryInput = document.getElementById('diary-text');
    const snowflakeHiddenInput = document.getElementById('snowflake-choice');
    
    // 눈송이 옵션들 (7개 모두 자동 인식)
    const snowOptions = document.querySelectorAll('.snow-option');

    // 눈송이 클릭 로직
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

    emotionSelect.addEventListener('change', () => {
        const config = emotionConfig[emotionSelect.value];
        appContainer.className = ''; 
        appContainer.id = 'app-container'; 
        if (config && config.bg) appContainer.classList.add(config.bg);
    });

    saveButton.addEventListener('click', () => {
        if (diaryInput.value.trim() === "") {
            alert("오늘의 감정을 기록해주세요!");
            diaryInput.focus();
            return;
        }

        const selectedEmotion = emotionSelect.value;
        const config = emotionConfig[selectedEmotion] || emotionConfig['normal'];
        let snowCount = (selectedEmotion === 'gloomy') ? 5 : 1; 

        for (let i = 0; i < snowCount; i++) {
            createSnowflake(config);
        }
        diaryInput.value = ""; 
    });

    function createSnowflake(config) {
        const newSnowflake = document.createElement('img');
        newSnowflake.src = snowflakeHiddenInput.value; 
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
});
