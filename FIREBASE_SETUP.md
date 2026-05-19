# Firebase / Vercel 배포 설정

이 앱은 Firebase Realtime Database, Firestore, Storage를 사용하지 않습니다. 운세 계산은 전부 브라우저에서 처리되므로 Firebase 다운로드/읽기 비용을 최소화할 수 있습니다.

## Firebase Hosting

Firebase 프로젝트: `mbtiluck`

```bash
npm run build
firebase login
firebase use mbtiluck
firebase deploy --only hosting
```

현재 포함된 설정:

- `.firebaserc`: 기본 프로젝트를 `mbtiluck`으로 지정
- `firebase.json`: `dist` 폴더를 Hosting public directory로 사용
- `database.rules.json`: 데이터베이스를 사용하지 않도록 읽기/쓰기를 닫아 둠

Firebase 콘솔 주소:

```txt
https://console.firebase.google.com/project/mbtiluck/overview
```

## Vercel

GitHub 저장소 `https://github.com/503pknu/MBTILuck`를 Vercel에 연결한 뒤 아래처럼 설정하세요.

- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

`vercel.json`도 같은 설정을 담고 있어 Vercel이 자동으로 인식할 수 있습니다.

## 사용량 최소화 메모

- 앱 실행 중 외부 DB 요청 없음
- 로고와 MBTI 참고 이미지는 정적 파일로만 제공
- Firebase Hosting만 사용하면 페이지 방문자는 HTML/CSS/JS/이미지만 내려받음
- 실제 이용자 결과를 저장하지 않으므로 개인정보 저장 비용과 보안 부담도 줄어듦
