# PS1 사회복지학 운세 마법사

MBTI, 혈액형, 생일 별자리를 조합해 오늘의 운세를 보여주는 정적 웹 앱입니다.

## 기능

- 이름, MBTI, 혈액형, 생일을 순서대로 입력하는 6단계 운세 흐름
- MBTI와 혈액형 선택 시 분홍색 선택 상태 표시
- 생일 입력 후 별자리 자동 계산
- MBTI × 혈액형 × 별자리 × 오늘 날짜 기반의 결정적 운세 계산
- 금전운, 연애운, 관계운, 건강운, 깜짝운 1-10점 표시
- 300자 내외 총평 자동 생성
- PS1 로고와 사회복지학 로고 활용

## Firebase 사용량 최소화

현재 앱은 Firebase SDK나 Realtime Database를 호출하지 않습니다. 모든 운세 계산은 브라우저에서 실행되므로 Firebase 다운로드/읽기 사용량이 발생하지 않습니다. Firebase를 쓴다면 정적 호스팅만 사용하는 구성이 가장 가볍습니다.

## 개발

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 배포

Vercel은 이 저장소를 연결한 뒤 Framework Preset을 `Vite`, Build Command를 `npm run build`, Output Directory를 `dist`로 설정하면 됩니다.

Firebase Hosting을 사용할 경우 `firebase init hosting`에서 public directory를 `dist`로 선택하고, 빌드 후 `firebase deploy --only hosting`을 실행하면 됩니다.
