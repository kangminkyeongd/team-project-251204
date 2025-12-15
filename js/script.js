document.addEventListener('DOMContentLoaded', () => {
    // 1. 필요한 요소들 가져오기
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const snowflakeSelect = document.getElementById('snowflake-choice');
    const diaryInput = document.getElementById('diary-text');

    // 버튼이 잘 찾아졌는지 확인 (에러 방지)
    if (!saveButton) {
        console.error("버튼을 찾을 수 없습니다! HTML ID를 확인하세요.");
        return;
    }

    // 2. 버튼 클릭 이벤트 (눈송이 담기)
    saveButton.addEventListener('click', () => {
        
        // 내용 입력했는지 확인
        if (diaryInput.value.trim() === "") {
            alert("오늘의 기록을 남겨주세요!");
            return;
        }

        // 3. 눈송이 이미지 만들기
        const newSnowflake = document.createElement('img');
        
        // 선택한 이미지로 설정
        newSnowflake.src = snowflakeSelect.value; 
        
        // 스타일 지정
        newSnowflake.style.position = 'absolute';
        newSnowflake.style.width = '35px'; // 눈송이 크기
        newSnowflake.style.height = '35px';
        newSnowflake.style.zIndex = '10';
        
        // 병 안에서 랜덤 위치 잡기
        // 왼쪽(0%) ~ 오른쪽(90%) 사이 랜덤
        newSnowflake.style.left = Math.random() * 85 + '%'; 
        // 바닥(0%) ~ 위(80%) 사이 랜덤
        newSnowflake.style.bottom = Math.random() * 80 + '%'; 
        
        // 살짝 회전시켜서 자연스럽게
        newSnowflake.style.transform = `rotate(${Math.random() * 360}deg)`;

        // 4. 병 안에 집어넣기
        snowPile.appendChild(newSnowflake);

        // 5. 마무리
        diaryInput.value = ""; // 입력창 비우기
        alert("눈송이가 병에 담겼습니다! ❄️");
    });
});
