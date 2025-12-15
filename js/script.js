document.addEventListener('DOMContentLoaded', () => {
    
    // 1. HTML에 있는 요소들을 가져옵니다. (이름표 확인 필수!)
    const saveButton = document.getElementById('save-button');
    const snowPile = document.getElementById('snow-pile');
    const snowflakeSelect = document.getElementById('snowflake-choice');
    const diaryInput = document.getElementById('diary-text');

    // 2. 버튼 클릭 이벤트 (눈송이 담기)
    saveButton.addEventListener('click', () => {
        
        // 입력창이 비어있으면 경고
        if (diaryInput.value.trim() === "") {
            alert("일기 내용을 적어주세요!");
            return;
        }

        // 3. 진짜 눈송이 이미지(img 태그) 만들기
        const newSnowflake = document.createElement('img');
        
        // 선택된 이미지 주소 (assets/snow-1.png 등) 가져오기
        newSnowflake.src = snowflakeSelect.value; 
        
        // 스타일 지정 (병 안에 예쁘게 쌓이도록)
        newSnowflake.style.position = 'absolute';
        newSnowflake.style.width = '30px'; // 눈송이 크기
        newSnowflake.style.height = '30px';
        
        // 병 안에서 랜덤한 위치에 떨어지게 하기 (자연스럽게)
        // left: 0% ~ 90% 사이 랜덤
        newSnowflake.style.left = Math.random() * 90 + '%'; 
        // top: 바닥부터 쌓이게 하거나 랜덤하게 (여기선 랜덤하게 배치 후 쌓이는 느낌)
        newSnowflake.style.bottom = Math.random() * 80 + '%'; 

        // 4. 병(snow-pile) 안에 집어넣기!
        snowPile.appendChild(newSnowflake);

        // 5. 성공 메시지 & 입력창 비우기
        console.log("눈송이 저장 완료!");
        diaryInput.value = ""; // 입력창 초기화
        alert("눈송이가 병에 담겼습니다! ❄️");
    });
});
