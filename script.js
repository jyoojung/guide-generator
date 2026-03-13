/**
 * script.js — 체험단 · 기자단 가이드 자동 생성 모듈
 */

// ──────────────────────────────────────────────
// DOM References
// ──────────────────────────────────────────────
const form = document.getElementById('guideForm');
const brandInput = document.getElementById('brandKeyword');
const mainInput = document.getElementById('mainKeyword');
const subInput = document.getElementById('subKeyword');
const hashInput = document.getElementById('hashtags');
const imageInput = document.getElementById('exampleImage');
const fileDropArea = document.getElementById('fileDropArea');
const fileUploadText = document.getElementById('fileUploadText');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');
const imagePreview = document.getElementById('imagePreview');
const imageRemoveBtn = document.getElementById('imageRemoveBtn');

const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toast');

const outputPlaceholder = document.getElementById('outputPlaceholder');
const outputResult = document.getElementById('outputResult');
const resultSection1 = document.getElementById('resultSection1');
const resultSection2a = document.getElementById('resultSection2a');
const resultImageSlot = document.getElementById('resultImageSlot');
const resultSection2b = document.getElementById('resultSection2b');
const resultSection3 = document.getElementById('resultSection3');
const resultSection4 = document.getElementById('resultSection4');

// ──────────────────────────────────────────────
// State
// ──────────────────────────────────────────────
let uploadedImageDataURL = null;
let isHashtagManuallyEdited = false;

// ──────────────────────────────────────────────
// Image Upload Handling
// ──────────────────────────────────────────────
imageInput.addEventListener('change', (e) => {
  handleImageFile(e.target.files[0]);
});

// Drag & Drop
fileDropArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  fileDropArea.classList.add('drag-over');
});

fileDropArea.addEventListener('dragleave', () => {
  fileDropArea.classList.remove('drag-over');
});

fileDropArea.addEventListener('drop', (e) => {
  e.preventDefault();
  fileDropArea.classList.remove('drag-over');
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleImageFile(file);
  }
});

function handleImageFile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    uploadedImageDataURL = e.target.result;
    imagePreview.src = uploadedImageDataURL;
    imagePreviewContainer.style.display = 'flex';
    fileUploadText.textContent = `✅ ${file.name}`;
  };
  reader.readAsDataURL(file);
}

imageRemoveBtn.addEventListener('click', () => {
  uploadedImageDataURL = null;
  imagePreview.src = '';
  imagePreviewContainer.style.display = 'none';
  imageInput.value = '';
  fileUploadText.textContent = '클릭하거나 이미지를 드래그하세요';
});

// ──────────────────────────────────────────────
// Hashtag 포맷터 (쉼표 구분, # 자동 추가)
// ──────────────────────────────────────────────
function formatHashtags(raw) {
  return raw
    .split(',')
    .map(tag => {
      const trimmed = tag.trim();
      if (!trimmed) return '';
      return trimmed.startsWith('#') ? trimmed : `#${trimmed}`;
    })
    .filter(Boolean)
    .join(', ');
}

// ──────────────────────────────────────────────
// 서브 키워드 포맷터 (슬래시 또는 쉼표 구분)
// ──────────────────────────────────────────────
function formatSubKeywords(raw) {
  return raw
    .split(/[,\/]/)
    .map(k => k.trim())
    .filter(Boolean)
    .join(' / ');
}

// ──────────────────────────────────────────────
// Template: 섹션별로 분리하여 반환
// ──────────────────────────────────────────────
function buildTemplate(brand, main, sub, hashtags) {
  const section1 = `**📌 전반적인 가이드**
(01) 브랜드 키워드 : ${brand}
(02) 주요 키워드 : ${main}
(03) 서브 키워드 : ${sub}
(04) 글자 수 : 700자 ~ 1700자 이내
(05) 사진 수 : 10 ~ 20장 이내`;

  // 사진 가이드 — 이미지 슬롯 전
  const section2a = `**📸 사진 가이드**
[촬영 방법]
(01) 쪽지로 보내드린 예시 화면을 그대로 캡처하지 마시고, 서비스 소개서나 웹페이지의 다양한 화면을 컴퓨터, 휴대폰 화면으로 연 상태에서 촬영한 파일을 업로드 부탁드립니다.
(02) 원고 내에 사진들을 한 각도로(한 배경으로) 찍는 게 아닌 다양한 각도의 다른 배경으로 찍어서 작성 부탁드립니다.`;

  // 사진 가이드 — 이미지 슬롯 후
  const section2b = `
[첨부 및 배치 규칙]
(01) 사진 수 : 10 ~ 20장 이내로 첨부 부탁드립니다.
(02) 사진 활용 : [사진 1장] - [글 10줄 이내] - [사진 1장] - [글 10줄 이내] 의 형식으로 작성해주세요.
  → 사진 1장 당 사진 아래에 최소 글 4줄 ~ 5줄을 꼭 지켜주세요!
(03) 사진이 3장 이상 모여있거나 연속되지 않게, 글은 10줄 이상 넘지 않도록 작성해주세요.`;

  const section3 = `**✒️ 내용 작성 가이드**
[참고 자료]
(01) 보내드린 서비스 소개서 및 링크를 확인하여 작성하실 내용을 참고해주세요.

[키워드 작성 규칙]
(01) 원고에 주요 키워드 '${main}'은(는) 7번 이내로 작성해주세요.
(02) 다음 중 한 가지 키워드를 선택하고 해당 키워드는 7번 이내로 작성해주세요.
  → ${sub}
(03) 선택한 키워드를 제외한 다른 키워드는 3번 이상 중복하여 사용하지 말아주세요.
(04) 원고에 '${brand}'(은)는 1번 이내로 작성 부탁드립니다. (최대한 사진을 통한 간접 노출을 부탁드립니다.)

[원고 작성 방향]
(01) 다른 홈페이지, 커뮤니티, 기사 정보성 글을 그대로 복사해서 작성하지 마시고 정보성 글을 사용하게 된다면 글을 쓰는 방식을 많이 우회해서 작성 부탁드립니다.
(02) 히든 이미지 사용 불가한 점 양해 부탁드립니다.
(03) 원고 내에 ${brand}의 특장점 혹은 선택한 이유 등을 숫자를 붙여 작성해 자연스럽게 숫자가 들어가게 해주세요.
  → 예) 브랜드 성공을 위한 첫걸음, ${brand}를 선택한 이유
  1.~~
  2.~~
  3.~~
(04) 경험성 동사, 주체, 시간표현, 긍정적인 표현(좋음)을 사용하여 글을 작성해주세요.
  → 예) 최근에 브랜드 리뉴얼을 준비하면서 ${brand}과 함께했는데, 방향성이 명확해지고 결과도 좋아서 정말 잘한 선택이었다고 생각해요!

[제목 및 마무리 규칙]
(01) 제목에 필수 키워드('${brand}')를 자연스럽게 맨 앞 또는 중간에 배치해주시고, 제목이 동사/질문 형태로 끝나지 않게 부탁드립니다. ('${brand}' 키워드를 제목 내 필수로 넣어주세요)
  → 틀린 예) "${brand}로 ${main}을 시작한다면?"
  → 맞는 예) "${brand} ${main} 솔루션으로 만드는 매출 중심의 시장 진입 전략"
(02) 맞춤법 검사기를 사용하여 검수하시고 업로드 해주시기 바랍니다.
(03) 좋아요와 블로그 스크랩을 열어놔 주세요.
(04) 블로그 최하단에 아래의 키워드를 순서대로 태그해주세요.
  → 블로그 글 하단에는 키워드 태그하지 말아주세요.
  ${hashtags}
(05) 글 최하단에 쪽지로 전달드린 서비스 링크를 첨부해주세요.
  [여기에 서비스 링크를 삽입해주세요]`;

  const section4 = `**🚨 추가 안내**
(01) 가이드라인이 지켜지지 않을 시 수정 요청이 있을 수 있습니다.
(02) 협의 없이 캠페인 취소가 불가합니다.
(03) 작성하신 게시글은 6개월 이상 유지해주세요.`;

  return { section1, section2a, section2b, section3, section4 };
}

// 클립보드용 전체 텍스트 (이미지 제외)
function buildFullText(brand, main, sub, hashtags) {
  const { section1, section2a, section2b, section3, section4 } = buildTemplate(brand, main, sub, hashtags);
  return [section1, section2a, section2b, section3, section4].join('\n\n');
}

// ──────────────────────────────────────────────
// Validation
// ──────────────────────────────────────────────
function validateFields() {
  const fields = [brandInput, mainInput, subInput, hashInput];
  let valid = true;

  fields.forEach(field => {
    field.classList.remove('invalid');
    if (!field.value.trim()) {
      field.classList.add('invalid');
      valid = false;
      // 떨림 애니메이션 재실행
      void field.offsetWidth;
    }
  });

  return valid;
}

// ──────────────────────────────────────────────
// Form Submit — 가이드라인 생성
// ──────────────────────────────────────────────
form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!validateFields()) {
    alert('모든 필수 항목을 입력해 주세요.');
    return;
  }

  const brand = brandInput.value.trim();
  const main = mainInput.value.trim();
  const sub = formatSubKeywords(subInput.value.trim());
  const hashtags = formatHashtags(hashInput.value.trim());

  const { section1, section2a, section2b, section3, section4 } = buildTemplate(brand, main, sub, hashtags);

  // 각 섹션 렌더링
  resultSection1.textContent = section1;
  resultSection2a.textContent = section2a;
  resultSection2b.textContent = section2b;
  resultSection3.textContent = section3;
  resultSection4.textContent = section4;

  // 이미지 슬롯 처리
  resultImageSlot.innerHTML = '';
  const tag = document.createElement('span');
  tag.className = 'result-image-tag';
  tag.textContent = '📎 예시 이미지';

  const img = document.createElement('img');
  // 이미지를 업로드한 경우 해당 이미지를, 없는 경우 기본 이미지를 사용합니다.
  img.src = uploadedImageDataURL ? uploadedImageDataURL : 'default-example.png';
  img.alt = '예시 이미지';

  resultImageSlot.appendChild(tag);
  resultImageSlot.appendChild(img);
  resultImageSlot.style.display = 'flex';

  // 결과 표시
  outputPlaceholder.style.display = 'none';
  outputResult.style.display = 'flex';

  // 복사 버튼 등장
  copyBtn.style.display = 'inline-flex';

  // 전체 텍스트를 dataset에 저장 (클립보드용)
  copyBtn.dataset.fullText = buildFullText(brand, main, sub, hashtags);

  // 결과 영역으로 부드럽게 스크롤 (모바일)
  if (window.innerWidth <= 960) {
    document.querySelector('.panel-output').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

// 입력값 변경 시 invalid 클래스 제거
[brandInput, mainInput, subInput, hashInput].forEach(input => {
  input.addEventListener('input', () => {
    input.classList.remove('invalid');
    
    // 해시태그 자동 완성 로직
    if (input !== hashInput && !isHashtagManuallyEdited) {
      updateHashtagsAutomatically();
    }
  });
});

// 해시태그 수동 수정 여부 체크
hashInput.addEventListener('input', () => {
  isHashtagManuallyEdited = hashInput.value.trim().length > 0;
});

function updateHashtagsAutomatically() {
  const brand = brandInput.value.trim();
  const main = mainInput.value.trim();
  const subRaw = subInput.value.trim();
  
  // 서브 키워드 파싱 (쉼표 또는 슬래시)
  const subKeywords = subRaw.split(/[,\/]/).map(k => k.trim()).filter(Boolean);
  
  const allKeywords = [brand, main, ...subKeywords].filter(Boolean);
  
  if (allKeywords.length > 0) {
    // # 붙여서 생성
    const autoTags = allKeywords
      .map(keyword => keyword.startsWith('#') ? keyword : `#${keyword}`)
      .join(', ');
    
    hashInput.value = autoTags;
  } else {
    hashInput.value = '';
  }
}

// ──────────────────────────────────────────────
// 클립보드 복사
// ──────────────────────────────────────────────
copyBtn.addEventListener('click', async () => {
  const text = copyBtn.dataset.fullText || '';
  try {
    await navigator.clipboard.writeText(text);
    showToast();
  } catch {
    // Fallback: execCommand
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    showToast();
  }
});

function showToast() {
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2200);
}
