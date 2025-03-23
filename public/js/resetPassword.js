// 🔹 HTML 문서가 완전히 로드된 후 실행
document.addEventListener("DOMContentLoaded", () => {
    // 🔹 비밀번호 재설정 폼 가져오기
    const resetPasswordForm = document.getElementById("resetPasswordForm");

    // 🔹 폼 제출 이벤트 리스너 등록
    resetPasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault(); // 🔹 기본 폼 제출 동작(페이지 새로고침) 방지

        // 🔹 입력 필드에서 값 가져오기
        const token = document.getElementById("token").value; // 🔹 서버에서 제공한 비밀번호 재설정 토큰
        const password = document.getElementById("password").value; // 🔹 사용자가 입력한 새 비밀번호
        const confirmPassword = document.getElementById("confirmPassword").value; // 🔹 비밀번호 확인

        // 디버깅 추가!
        console.log("📌 [DEBUG] 보내는 데이터:", { token, password, confirmPassword }); 

        // 🔹 비밀번호와 비밀번호 확인이 일치하지 않으면 경고 후 중단
        if (password !== confirmPassword) {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }

        try {
            // 🔹 비밀번호 재설정 API 요청 보내기
            const response = await fetch("/api/password/reset", {
                method: "POST", // 🔹 HTTP POST 요청 (비밀번호 변경 요청)
                headers: { "Content-Type": "application/json" }, // 🔹 JSON 형식으로 데이터 전송
                body: JSON.stringify({ token, password, confirmPassword }), // 🔹 요청 본문 (JSON 데이터)
            });

            // 🔹 서버 응답을 JSON 형식으로 변환
            const data = await response.json();

            // 🔹 서버 응답 메시지를 사용자에게 표시
            alert(data.message);

            // 🔹 요청이 성공하면 로그인 페이지로 이동
            if (response.ok) {
                window.location.href = "/login"; // 🔹 로그인 페이지로 리디렉션
            }
        } catch (error) {
            // 🔹 오류 발생 시 콘솔에 출력 및 사용자에게 알림 표시
            console.error("비밀번호 재설정 중 오류 발생:", error);
            alert("비밀번호 재설정 중 문제가 발생했습니다.");
        }
    });
});
