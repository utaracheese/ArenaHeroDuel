/* ===================================================
   CHẾ ĐỘ CHƠI: PHÙ HIỆU (RUNE SYSTEM) - ĐÃ CẬP NHẬT
   =================================================== */

// --- DANH SÁCH THẺ PHÙ HIỆU ---
const RUNES_BASIC = [
    { id: 'daotan', name: 'Đao Tàn', tier: 0, desc: 'Tăng dame, giảm theo totem', text: 'Tăng 50% dame địch nhận vào, mỗi lần địch mất totem sẽ giảm 10%' },
    { id: 'cotex', name: 'Cotex', tier: 0, desc: 'Siêu cấp hút máu, hồi máu', text: 'Toàn bộ dame gây ra giúp hồi 50% HP, mỗi 2s hồi 2% HP' },
    { id: 'trucot', name: 'Trụ Cột', tier: 0, desc: 'Địch mất totem, hồi phục', text: 'Khi địch mất totem bản thân hồi 50% HP đã mất' },
    { id: 'phevocong', name: 'Phế Võ Công', tier: 0, desc: 'Câm lặng cả 2, bản thân tăng gấp đôi tốc đánh', text: 'Khóa chiêu cả 2 (60s CD), bản thân giảm 50% hồi đòn đánh thường' },
    { id: 'tanghinh', name: 'Tàng Hình', tier: 0, desc: 'Tàng hình', text: 'Ẩn hoàn toàn bản thân, mỗi 5s hiện mờ nhẹ 0.5s rồi lại tàng hình' },
    { id: 'caocao', name: 'Cào Cào', tier: 0, desc: 'Nhảy cao hơn mỗi 5s', text: 'Đứng đất 5s giúp lần nhảy kế tiếp tích lực nhảy cao gấp đôi' },
    { id: 'nuocrut', name: 'Nước Rút', tier: 0, desc: 'Tăng 50% tốc độ', text: 'Tăng 50% tốc độ di chuyển hiện có, tạo vệt chớp điện' },
    { id: 'chanap', name: 'Chấn Áp', tier: 0, desc: 'Đón đầu với đòn đánh cực mạnh', text: 'Nếu địch có trên 80% HP, sát thương gây ra tăng 75%' },
    { id: 'phanquyet', name: 'Phán Quyết', tier: 0, desc: 'Dứt điểm máu yếu', text: 'Sau khi gây dame, nếu địch còn <= 15% HP, sau 0.5s bắn 1 tia phán quyết từ trên trời gây sát thương bằng 50% HP tối đa của địch (10s CD)' },
    { id: 'diemyeu', name: 'Điểm Yếu', tier: 0, desc: 'Địch dưới 50% HP nhận thêm 30% dame (hiển thị hiệu ứng suy nhược dưới chân địch)', text: 'Địch dưới 50% HP nhận thêm 30% dame (hiển thị hiệu ứng suy nhược dưới chân địch)' },
    { id: 'apche', name: 'Áp Chế', tier: 0, desc: 'Gây dame làm choáng', text: 'Gây dame có 5% tỷ lệ làm choáng đối thủ 0.7s' },
    { id: 'hedieuhanhwindows', name: 'Hệ Điều Hành Windows', tier: 0, desc: 'Gây dame có tỉ lệ dịch chuyển', text: 'Gây dame/ nhận dame có 5% cả 2 được teleport đến 1 vị trí random trong map (trên mặt đất hoặc cấu trúc)' },
    { id: 'songdaithanhhuyenthoai', name: 'Sống Dai Thành Huyền Thoại', tier: 0, desc: 'Giữ mạng giữ sức mạnh', text: 'Nếu giữ nguyên số totem tại thời điểm chọn, bản thân luôn được x2 lượng dame và giảm 25% dame nhận vào' },
    { id: 'doicanhtudo', name: 'Đôi Cánh Tự Do', tier: 0, desc: 'miễn st rơi, nhảy cao', text: 'Miễn sát thương rơi và nhận thêm 1 lần nhảy tối đa (double jump thành triple jump, có sẵn triple thành 4 lần). Vẽ đôi cánh vẫy vẫy sau lưng.' },
    { id: 'trinhsatdoan', name: 'Trinh Sát Đoàn', tier: 0, desc: 'gây dame triệu hồi levi', text: 'Gây dame lập tức dùng chiêu 2 của Levi tại vị trí bản thân (hồi chiêu 5s).' },
    { id: 'vongtronmaphap', name: 'Vòng Tròn Ma Pháp', tier: 0, desc: 'tạo bẫy ma pháp định kỳ', text: 'Mỗi 5s sẽ kích hoạt chiêu 1 (tạo bẫy) của Everett ngay tại vị trí địch.' },
    
    // --- PHÙ HIỆU SƠ CẤP MỚI ---
    { id: 'banchanloxo', name: 'Bàn Chân Lò Xo', tier: 0, desc: 'Nhảy tự nảy, tăng vĩnh viễn sát thương', text: 'Khi nhảy sẽ tự động nảy thêm 1 lần nữa trên không. Mỗi lần nhảy kích hoạt lò xo giúp tăng vĩnh viễn 0.25% sát thương.' },
    { id: 'meodenmayman', name: 'Mèo Đen May Mắn', tier: 0, desc: '25% x4.5 dame, 75% 0 dame', text: 'Đòn đánh may rủi: có 25% tỷ lệ gây x4.5 sát thương (hiển thị vàng), 75% tỷ lệ không gây sát thương (0 dame xám). Vẽ mắt mèo trên đầu.' },
    { id: 'tuikhi', name: 'Túi Khí', tier: 0, desc: 'Lướt tạo lá chắn', text: 'Mỗi khi dùng Dash nhận ngay lớp giáp ảo (bhshield) bằng 15% HP tối đa. Vẽ hiệu ứng lá chắn mờ xung quanh.' },
    { id: 'amsat', name: 'Ám Sát', tier: 0, desc: 'Gây thêm sát thương sau lưng', text: 'Đòn đánh trúng từ phía sau lưng địch gây thêm 100% sát thương (gấp đôi dame).' },
    { id: 'vochuoi', name: 'Vỏ Chuối', tier: 0, desc: 'Tạo vỏ chuối mỗi 2.5s', text: 'Mỗi 2.5s di chuyển thả 1 vỏ chuối (tối đa 10 vỏ). Địch giẫm phải tăng 100% tốc chạy trong 0.15s rồi bị choáng 2s (kèm hiệu ứng xoay tròn).' },
    { id: 'muoi', name: 'Muỗi', tier: 0, desc: 'Triệu hồi muỗi hút máu', text: 'Triệu hồi 5 con muỗi bay lượn. Mỗi 3-7s muỗi lao tới cắn địch gây 2 dame rồi bay về hồi 2 HP cho chủ nhân.' },
    { id: 'khantrumthoigian', name: 'Khăn Trùm Thời Gian', tier: 0, desc: 'Quay ngược trạng thái về 4s trước', text: 'Lưu trạng thái HP, totem và hồi chiêu; sau 4s quay ngược bản thân về trạng thái đó (lặp lại mỗi 10s). Hiển thị khăn trùm thời gian khi kích hoạt.' },
    { id: 'denpinthunho', name: 'Đèn Pin Thu Nhỏ', tier: 0, desc: 'Thu nhỏ tăng dame lên địch', text: 'Chiếu đèn pin thu nhỏ địch còn 50% kích thước và tăng 75% sát thương nhận vào của địch trong 60s.' }
];

const RUNES_INTERMEDIATE = [
    { id: 'phidan', name: 'Phi Đạn', tier: 1, desc: 'Trúng chiêu xả đạn', text: 'Chiêu gây dame sẽ xả 1 phi đạn vàng quanh người bay tới địch (1-3 dame)' },
    { id: 'phaodan', name: 'Pháo Đạn', tier: 1, desc: 'Trúng chiêu có tỉ lệ xả đạn', text: 'Chiêu gây dame có 20% cơ hội xả pháo đạn tím (1-15 dame)' },
    { id: 'phandon', name: 'Phản Đòn', tier: 1, desc: 'Trúng đòn phản lại', text: 'Khi nhận sát thương phản 1 đạn năng lượng về hướng địch' },
    { id: 'khoathe', name: 'Khóa Thẻ', tier: 1, desc: 'Khóa thẻ cao cấp của địch', text: 'Ép địch nhận thẻ Phế Vật ở ô Cao Cấp (Ô thứ 4)' },
    { id: 'samren', name: 'Sấm Rền', tier: 1, desc: 'Sét đánh choáng & phần trăm HP', text: 'Đánh thường (10%) hoặc Chiêu (5%) gọi sét đánh gây 7% HP còn lại của địch + choáng 0.5s' },
    { id: 'diencuong', name: 'Điên Cuồng', tier: 1, desc: 'Gấp đôi tốc đánh', text: 'Thời gian hồi đánh thường giảm 50%, các chỉ số tăng tốc đánh sau này x2 hiệu quả' },
    { id: 'loithithamcuagio', name: 'Lời Thì Thầm Của Gió', tier: 1, desc: 'Di chuyển hồi chiêu', text: 'Di chuyển đoạn đường 200px giúp giảm 1s hồi chiêu cho toàn bộ kỹ năng (trừ đánh thường và Dash)' },
    { id: 'haphoi', name: 'Hấp Hối', tier: 1, desc: 'Càng yếu càng mạnh', text: 'Mỗi 5% HP mất đi tăng 4% tốc chạy và tăng 5% lượng HP được hồi phục' },
    { id: 'thanhca', name: 'Thánh Ca', tier: 1, desc: 'Hồi phục khi chịu đòn', text: 'Nhận 5 lần sát thương (trừ sát thương rơi) giúp hồi 5% HP' },
    { id: 'huthuctu', name: 'Hư Thức Tử', tier: 1, desc: 'Gây choáng bắn hư thức tử', text: 'Sau khi làm choáng địch, xuất hiện Gojo ảo vận chiêu bắn Hollow Purple thật về phía địch' },
    { id: 'skibidi', name: 'Skibidi', tier: 1, desc: 'Triệu hồi skibidi tấn công địch', text: 'Triệu hồi 1 skibidi toilet lazer trong map bay quanh, khi phát hiện địch trong 500px lập tức chiếu lazer gây 2 dame mỗi 0.2s' },
    { id: 'ancuctrau', name: 'Ăn Cức Trâu Sống Lâu Bất Tử', tier: 1, desc: 'ăn cức trâu hồi phục tăng giáp', text: 'Mỗi 5s spawn 1 cục cức trâu (mất sau 10s ko nhặt). Nhặt giúp hồi 7% HP và nhận hiệu ứng shield 20% trong 5s (tạo lá chắn mờ nhiễu).' },
    { id: 'bommu', name: 'Bom Mù', tier: 1, desc: 'gây dame mù cả 2', text: 'Gây dame làm phát sáng toàn map (tạo 1 lớp trắng phủ mượt lên) trong 2.5s (hồi chiêu 7s).' },
    { id: 'antonoidon', name: 'Ăn To Nói Lớn', tier: 1, desc: 'hét vô mic gây dame và hồi phục', text: 'Nói vào mic đủ lớn lập tức hồi 1 HP và tạo 1 làn sóng tỏa 500px gây 2-4 dame (gần) hoặc 1 dame (xa) - hồi chiêu 0.15s.' },
    { id: 'thephachtitan', name: 'Thể Phách Titan', tier: 1, desc: 'tăng hitbox tăng sức mạnh', text: 'Hitbox và hình dáng bản thân phóng to gấp 7 lần, hitbox đạn to gấp 3 lần và x3 sát thương.' },
    { id: 'bongma', name: 'Bóng Ma', tier: 1, desc: 'tạo bóng giựt bóng', text: 'Khi nhận sẽ tạo 1 bóng đen tại vị trí hiện tại, Dash giảm còn 0.5s hồi. Khi kích hoạt Dash lập tức đổi vị trí bóng và bản thân.' },

    // --- PHÙ HIỆU TRUNG CẤP MỚI ---
    { id: 'xeomcongnghe', name: 'Xe Ôm Công Nghệ', tier: 1, desc: 'Di chuyển tạo khói độc', text: 'Mỗi khi di chuyển 75px sẽ để lại 1 làn khói tồn tại 5s (bán kính 50px). Địch đứng trong khói nhận 1 dame mỗi 0.2s (đứng nhiều vùng nhận sát thương cộng dồn).' },
    { id: 'hiente', name: 'Hiến Tế', tier: 1, desc: 'Mất totem tạo vụ nổ 650 dame', text: 'Khi mất totem tạo 1 vùng cảnh báo 360px làm chậm địch 95% và khóa Dash. Sau 5s phát nổ hủy diệt gây 650 dame trong phạm vi.' },
    { id: 'hoandoi', name: 'Hoán Đổi', tier: 1, desc: 'Đổi tướng giữa 2 người chơi', text: 'Hoán đổi hoàn toàn nhân vật của Player 1 và Player 2 cho nhau ngay khi nhặt, giữ nguyên HP và số Totem.' },
    { id: 'tranhdon', name: 'Tránh Dồn', tier: 1, desc: 'Chỉ nhận tối đa 50 dame mỗi giây', text: 'Mỗi 1s chỉ nhận tối đa 50 sát thương. Sát thương vượt quá ngưỡng sẽ bị triệt tiêu hoàn toàn.' },
    { id: 'tamkhienkienco', name: 'Tấm Khiên Kiên Cố', tier: 1, desc: 'Mỗi đòn nhận tối đa 40 dame', text: 'Mỗi lần nhận sát thương chỉ nhận tối đa 40 dame. Đòn đánh lớn hơn sẽ tự động giảm về 40.' },
    { id: 'vohahan', name: 'Vô Hạ Hạn', tier: 1, desc: 'Lá chắn đẩy lùi đạn và kẻ địch', text: 'Bật lá chắn bảo vệ trong 5s, hồi lại sau 5s (chu kỳ liên tục). Khi bật, mọi đạn và kẻ địch chạm vào đều bị dính và đẩy dạt ra rìa lá chắn theo trục X.' }
];

const RUNES_ADVANCED = [
    { id: 'dungcantao', name: 'Đừng Cản Tao', tier: 2, desc: 'Miễn khống & Giảm 25% sát thương', text: 'Nhận hiệu ứng Ironbody vĩnh viễn và giảm 25% mọi sát thương nhận vào.' },
    { id: 'tinhthanyeuot', name: 'Tinh Thần Yếu Ớt', tier: 2, desc: 'Tăng dame theo thời gian', text: 'Mỗi 2s cộng dồn 1 tầng, mỗi tầng tăng 1% dame' },
    { id: 'sieutoc', name: 'Siêu Tốc', tier: 2, desc: 'Tăng tốc chạy khi dùng chiêu', text: 'Mỗi lần dùng chiêu +4% tốc chạy (tối đa 100 tầng)' },
    { id: 'phevat', name: 'Phế Vật', tier: 2, desc: 'Thẻ phế vật - không có tác dụng', text: 'Thẻ bị khóa bởi đối thủ, không có tác dụng' },
    { id: 'tuchien', name: 'Tử Chiến', tier: 2, desc: 'Sắp die, quyết đấu', text: 'Khi HP <= 50: Clear đạn địch, +100% tốc đánh, +50% tốc chạy, hồi 10 HP (+5 HP/đòn đánh thường), miễn thương 100% giảm dần + Ironbody trong 5s (25s CD)' },
    { id: 'thanhquyet', name: 'Thánh Quyết', tier: 2, desc: 'Giảm hồi chiêu, bộc phát thánh quyết', text: 'Giảm 20% thời gian hồi chiêu. Gây dame chiêu 4 lần sẽ gây 15 dame + hồi 15 HP cho bản thân' },
    { id: 'kimjongun', name: 'Kim Jong Un Cậu Bé Bút Chì', tier: 2, desc: 'Thả 3 quả bom mỗi 0.25s', text: 'Mỗi 0.25s thả 3 quả pháo từ trên trời ngẫu nhiên (65% xuyên platform, trúng nổ gây 30 dame)' },
    { id: 'lienbaokich', name: 'Liên Bạo Kích', tier: 2, desc: 'Bão đạn năng lượng liên tục', text: 'Mỗi 1s bắn đạn 3 lần mỗi lần 20 đạn năng lượng về các hướng random gây 2-4dame/ đạn' },
    { id: 'tungtungsahur', name: 'Tung Tung Tung Sahur', tier: 2, desc: 'Hóa Tung Tung Tung Sahur (2 mạng)', text: 'Hóa thân thành Tung Tung Tung Sahur cầm gậy bóng chày với bộ kỹ năng tầm xa vô hạn và 2 mạng riêng. Khi mất hết 2 mạng sẽ lưu lại HP cũ, hất văng địch và trở lại bình thường.' },
    { id: 'daonguocthoigian', name: 'Đảo Ngược Thời Gian', tier: 2, desc: 'hồi 3 totem làm lại từ đầu', text: 'Hồi lại tối đa 3 totem (không vượt 7/7) của cả 2 và xóa toàn bộ phù hiệu của cả 2 để nhặt lại từ đầu.' },
    { id: 'chammachac', name: 'Chậm Mà Chắc', tier: 2, desc: 'sau 15s có thể onehit địch', text: 'Sau 15s không dùng chiêu hay đánh thường (có thể Dash), đòn đánh kế tiếp gây dame bằng toàn bộ lượng HP + Giáp ảo còn lại của địch.' },
    { id: 'maphaplienhoi', name: 'Ma Pháp Liên Hồi', tier: 2, desc: 'bật 0s hồi chiêu định kỳ', text: 'Bật trạng thái 0s hồi chiêu (toàn bộ chiêu thành 0.15s hồi) trong 5s, kết thúc chờ 10s sau sẽ lặp lại.' },
    { id: 'thukhoaa00', name: 'Thủ Khoa A00', tier: 2, desc: 'giải toán 6s bắn đáp án', text: 'Xuất hiện [Số 1] [Phép tính] [Số 2] trên đầu. Mỗi 2s điền 1 ô (6s xong), 1s sau ra kết quả, 1s sau bắn đáp án về phía địch gây sát thương bằng kết quả đó (làm tròn lên).' },

    // --- PHÙ HIỆU CAO CẤP MỚI ---
    { id: 'hoden', name: 'Hố Đen', tier: 2, desc: 'Gây dame tạo hố đen hút địch', text: 'Mỗi khi gây sát thương tạo 1 hố đen hút đối thủ nhẹ theo cả 2 trục tồn tại trong 3.5s (hồi chiêu 0.25s).' },
    { id: 'luabo', name: 'Lùa Bò', tier: 2, desc: 'Triệu hồi bò húc mỗi 2.5s', text: 'Mỗi 2.5s triệu hồi 1 con bò sừng chạy qua màn hình. Bò có thể nhảy khi gặp địch, húc trúng gây 20 dame, hất tung và gây choáng 2.5s.' },
    { id: 'tienlen', name: 'Tiến Lên', tier: 2, desc: 'Tích tụ tốc độ húc cực mạnh', text: 'Sau khi Dash, khóa chiêu và đứng yên trong 5s để tích lũy. Sau 5s tăng tốc độ di chuyển (+5%/giây), giảm 75% sát thương nhận vào, tích tầng mỗi 0.33s. Đâm trúng địch gây (tầng/4)^2 - 1 sát thương.' },
    { id: 'daibackhongkhi', name: 'Đại Bác Không Khí', tier: 2, desc: 'Bắn đại bác không khí sau đánh thường', text: 'Mỗi đòn đánh thường sẽ tự động kích hoạt thêm 1 phát đạn Đại Bác Không Khí của Doraemon sau 0.2s.' },
    { id: 'macham', name: 'Ma Chảm', tier: 2, desc: 'Đánh thường kèm 1 đòn phụ', text: 'Mỗi khi đánh thường sẽ tự động đánh thêm 1 đòn đánh thường nữa của bản thân sau 0.2s gây 50% sát thương.' }
];

// Cache ảnh nền phù hiệu
const runeImageCache = {};
function getRuneImage(id) {
    if (!runeImageCache[id]) {
        const img = new Image();
        img.src = `assets/gameplay/${id}.png`;
        runeImageCache[id] = img;
    }
    return runeImageCache[id];
}

// --- BIẾN QUẢN LÝ HỆ THỐNG ---
let phuHieuState = {
    items: [],
    projectiles: [],
    vfx: [],
    cucTrauList: [],
    bananaPeels: [],
    gasClouds: [],
    blackHoles: [],
    bulls: [],
    mosquitoes: [],
    flashWhiteTimer: 0,
    spawnTimer: 0,
    active: false
};

// --- HỆ THỐNG MICROPHONE CHO PHÙ HIỆU "ĂN TO NÓI LỚN" ---
let micStream = null;
let micAudioContext = null;
let micAnalyser = null;
let micDataArray = null;

function initMicForRune() {
    if (micAnalyser) return;
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            micStream = stream;
            micAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            let source = micAudioContext.createMediaStreamSource(stream);
            micAnalyser = micAudioContext.createAnalyser();
            micAnalyser.fftSize = 256;
            micDataArray = new Uint8Array(micAnalyser.frequencyBinCount);
            source.connect(micAnalyser);
        }).catch(err => {
            console.log("Mic access error:", err);
        });
    }
}

function getMicVolume() {
    if (!micAnalyser || !micDataArray) return 0;
    micAnalyser.getByteFrequencyData(micDataArray);
    let sum = 0;
    for (let i = 0; i < micDataArray.length; i++) {
        sum += micDataArray[i];
    }
    return sum / micDataArray.length;
}

// --- KHỞI TẠO CHẾ ĐỘ ---
function initPhuHieuMode() {
    phuHieuState.active = true;
    phuHieuState.items = [];
    phuHieuState.projectiles = [];
    phuHieuState.vfx = [];
    phuHieuState.cucTrauList = [];
    phuHieuState.bananaPeels = [];
    phuHieuState.gasClouds = [];
    phuHieuState.blackHoles = [];
    phuHieuState.bulls = [];
    phuHieuState.mosquitoes = [];
    phuHieuState.flashWhiteTimer = 0;
    phuHieuState.spawnTimer = 0;

    const setupPlayer = (player) => {
        player.totems = 7; 
        player.runes = [null, null, null, null];
        player.pendingChoices = null;
        player.lastRuneChoices = [];
        player.daotanBonus = 50;
        player.tinhThanStacks = 0;
        player.sieuTocStacks = 0;
        player.groundedTimer = 0;
        player.caocaoCharged = false;
        player.tangHinhTimer = 0;

        player.phanQuyetCd = 0;
        player.thanhCaHitCount = 0;
        player.thanhQuyetHits = 0;
        player.tuChienCd = 0;
        player.tuChienActiveTimer = 0;
        player.moveDistAccumulator = 0;
        player.lastStunState = false;
        player.songDaiSnapTotems = null;
        player.lienBaoKichTimer = 0;

        player.trinhSatDoanCd = 0;
        player.vongTronMaPhapTimer = 0;
        player.cucTrauSpawnTimer = 0;
        player.cucTrauShieldTimer = 0;
        player.bomMuCd = 0;
        player.anToNoiLonTimer = 0;
        player.shadowRunePos = null;
        player.hasBongMaRune = false;
        player.chamMaChacTimer = 0;
        player.chamMaChacReady = false;
        player.maPhapLienHoiTimer = 0;
        player.isMaPhapActive = false;
        player.isThePhachTitan = false;

        // THỦ KHOA A00
        player.a00Timer = 0;
        player.a00Num1 = null;
        player.a00Op = null;
        player.a00Num2 = null;
        player.a00Result = null;

        player.isTungTung = false;
        player.tungTungLives = 0;
        player.tungTungSavedHp = null;
        player.tungTungWalkFrame = 0;

        // BIẾN CHO CÁC PHÙ HIỆU MỚI
        player.banChanLoXoBonus = 0;
        player.isAutoSpringJumping = false;
        player.voChuoiTimer = 0;
        player.voChuoiSlippedTimer = 0;
        player.khanTrumTimer = 0;
        player.khanTrumSnap = null;
        player.khanTrumAnimTimer = 0;
        player.denPinTimer = 0;
        player.xeOmAccumulator = 0;
        player.tranhDonTimer = 0;
        player.tranhDonCurrent = 50;
        player.voHaHanTimer = 0;
        player.voHaHanActive = true;
        player.hoDenCd = 0;
        player.luaBoTimer = 0;
        player.tienLenStage = 0; 
        player.tienLenStacks = 0;
        player.tienLenTimer = 0;

        // --- HOOK NHẬN SÁT THƯƠNG ---
        const origTakeDamage = player.takeDamage;
        player.takeDamage = function (amount, damageType) {
            let enemy = (this === player1) ? player2 : player1;
            let finalDmg = amount;

            // 1. MÈO ĐEN MAY MẮN (RNG SÁT THƯƠNG)
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'meodenmayman') {
                if (Math.random() < 0.75) {
                    effects.push(new DamageText(this.x + this.width / 2, this.y - 10, "0", '#888888'));
                    return; // 75% không gây sát thương
                } else {
                    finalDmg *= 4.5;
                }
            }

            // 2. ÁM SÁT (GÂY THÊM SÁT THƯƠNG KHI ĐÁNH VÀO LƯNG ĐỊCH)
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'amsat') {
                let isBehind = (this.facingRight && enemy.x < this.x) || (!this.facingRight && enemy.x > this.x);
                if (isBehind) {
                    finalDmg *= 2.0;
                }
            }

            // 3. ĐÈN PIN THU NHỎ (TĂNG 75% DAME)
            if (this.denPinTimer > 0) {
                finalDmg *= 1.75;
            }

            // 4. BÀN CHÂN LÒ XO
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'banchanloxo') {
                finalDmg *= (1 + (enemy.banChanLoXoBonus || 0) / 100);
            }

            // 5. ĐÔI CÁNH TỰ DO (MIỄN ST RƠI)
            if (damageType === 'fall' && this.runes && this.runes[0] && this.runes[0].id === 'doicanhtudo') {
                return;
            }

            // 6. CHẤN ÁP
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'chanap') {
                if (this.hp > this.maxHp * 0.8) finalDmg *= 1.75;
            }

            // 7. ĐIỂM YẾU
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'diemyeu') {
                if (this.hp < this.maxHp * 0.5) finalDmg *= 1.30;
            }

            // 8. ĐAO TÀN
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'daotan') {
                finalDmg *= (1 + (enemy.daotanBonus || 0) / 100);
            }

            // 9. SỐNG DAI THÀNH HUYỀN THOẠI
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'songdaithanhhuyenthoai') {
                if (enemy.songDaiSnapTotems !== null && enemy.totems >= enemy.songDaiSnapTotems) finalDmg *= 2.0;
            }
            if (this.runes && this.runes[0] && this.runes[0].id === 'songdaithanhhuyenthoai') {
                if (this.songDaiSnapTotems !== null && this.totems >= this.songDaiSnapTotems) finalDmg *= 0.75;
            }

            // 10. TINH THẦN YẾU ỚT
            if (enemy.runes && enemy.runes[3] && enemy.runes[3].id === 'tinhthanyeuot') {
                finalDmg *= (1 + (enemy.tinhThanStacks || 0) / 100);
            }

            // 11. THỂ PHÁCH TITAN
            let hasTitan = (enemy.runes[1] && enemy.runes[1].id === 'thephachtitan') || (enemy.runes[2] && enemy.runes[2].id === 'thephachtitan');
            if (hasTitan) {
                finalDmg *= 3.0;
            }

            // 12. ĐỪNG CẢN TAO (GIẢM 25% SÁT THƯƠNG NHẬN VÀO)
            if (this.runes && this.runes[3] && this.runes[3].id === 'dungcantao') {
                finalDmg *= 0.75;
            }

            // 13. TIẾN LÊN (GIẢM 75% DAME TRONG LÚC TÍCH TỐC)
            if (this.tienLenStage === 3) {
                finalDmg *= 0.25;
            }

            // 14. CHẬM MÀ CHẮC (ONEHIT ĐÒN ĐÁNH THƯỜNG / CHIÊU)
            if (enemy.chamMaChacReady) {
                finalDmg = this.hp + (this.tempShield || 0) + (this.boomShield || 0);
                enemy.chamMaChacReady = false;
                enemy.chamMaChacTimer = 0;

                for (let k = 0; k < 12; k++) {
                    effects.push(new LightningZap(this.x + Math.random() * this.width, 0, this.x + Math.random() * this.width, this.y + this.height, '#00ffff'));
                }
                effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 180, '#ff0055'));
                effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#ffd700', 0));
                canvas.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`;
                setTimeout(() => canvas.style.transform = 'none', 200);
            }

            // 15. TỬ CHIẾN
            if (this.tuChienActiveTimer > 0) {
                let reductRatio = this.tuChienActiveTimer / 300;
                finalDmg *= (1 - reductRatio);
            }

            // 16. TẤM KHIÊN KIÊN CỐ (MAX 40 DAME / ĐÒN)
            let hasTamKhien = (this.runes[1] && this.runes[1].id === 'tamkhienkienco') || (this.runes[2] && this.runes[2].id === 'tamkhienkienco');
            if (hasTamKhien) {
                finalDmg = Math.min(40, finalDmg);
            }

            // 17. TRÁNH DỒN (TỐI ĐA 50 DAME MỖI GIÂY)
            let hasTranhDon = (this.runes[1] && this.runes[1].id === 'tranhdon') || (this.runes[2] && this.runes[2].id === 'tranhdon');
            if (hasTranhDon) {
                if (this.tranhDonCurrent <= 0) {
                    return;
                }
                if (finalDmg > this.tranhDonCurrent) {
                    finalDmg = this.tranhDonCurrent;
                }
                this.tranhDonCurrent -= finalDmg;
            }

            origTakeDamage.call(this, finalDmg, damageType);

            // TẠO HỐ ĐEN KHI GÂY DAME
            if (enemy.runes && enemy.runes[3] && enemy.runes[3].id === 'hoden' && finalDmg > 0) {
                if (enemy.hoDenCd <= 0) {
                    enemy.hoDenCd = 15; // 0.25s hồi
                    phuHieuState.blackHoles.push(new BlackHoleVortex(this.x + this.width / 2, this.y + this.height / 2, enemy, this));
                }
            }

            // TRINH SÁT ĐOÀN
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'trinhsatdoan' && finalDmg > 0) {
                if (enemy.trinhSatDoanCd <= 0) {
                    enemy.trinhSatDoanCd = 300;
                    phuHieuState.vfx.push(new TrinhSatDoanSpin(enemy, this));
                }
            }

            // BOM MÙ
            let hasBomMu = (enemy.runes[1] && enemy.runes[1].id === 'bommu') || (enemy.runes[2] && enemy.runes[2].id === 'bommu');
            if (hasBomMu && finalDmg > 0 && enemy.bomMuCd <= 0) {
                enemy.bomMuCd = 420;
                phuHieuState.flashWhiteTimer = 150;
            }

            // TUNG TUNG SAHUR XỬ LÝ CHẾT MẠNG
            if (this.isTungTung && this.hp <= 0) {
                if (this.tungTungLives > 1) {
                    this.tungTungLives--;
                    this.hp = this.maxHp;
                    this.isDead = false;
                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 90, '#ffd700'));
                } else {
                    this.isTungTung = false;
                    this.tungTungLives = 0;
                    this.hp = this.tungTungSavedHp || this.maxHp;
                    this.isDead = false;

                    let knockDir = (enemy.x >= this.x) ? 1 : -1;
                    enemy.vx = knockDir * 35;
                    enemy.vy = -12;
                    enemy.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 45, 0, 60);

                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 160, '#ff0055'));
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#ffffff', 0));
                }
            }

            // WINDOWS TELEPORT
            let hasWinP1 = (this.runes[0] && this.runes[0].id === 'hedieuhanhwindows') || (enemy.runes[0] && enemy.runes[0].id === 'hedieuhanhwindows');
            if (hasWinP1 && finalDmg > 0 && Math.random() < 0.05) {
                teleportBothToValidGround(this, enemy);
            }

            // COTEX
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'cotex' && finalDmg > 0) {
                let healAmt = finalDmg * 0.5;
                let healBonus = 1;
                if (enemy.runes[1] && enemy.runes[1].id === 'haphoi') {
                    let lostHpPct = ((enemy.maxHp - enemy.hp) / enemy.maxHp) * 100;
                    healBonus += (Math.floor(lostHpPct / 5) * 0.05);
                }
                enemy.hp = Math.min(enemy.maxHp, enemy.hp + healAmt * healBonus);
                spawnCotexAura(enemy);
            }

            // PHẢN ĐÒN
            let hasPhanDon = (this.runes[1] && this.runes[1].id === 'phandon') || (this.runes[2] && this.runes[2].id === 'phandon');
            if (hasPhanDon && finalDmg > 0 && damageType !== 'phandon_reflect') {
                spawnPhanDonReflect(this, enemy, finalDmg);
            }

            // THÁNH CA
            let hasThanhCa = (this.runes[1] && this.runes[1].id === 'thanhca') || (this.runes[2] && this.runes[2].id === 'thanhca');
            if (hasThanhCa && finalDmg > 0 && damageType !== 'fall') {
                this.thanhCaHitCount = (this.thanhCaHitCount || 0) + 1;
                if (this.thanhCaHitCount >= 5) {
                    this.thanhCaHitCount = 0;
                    let heal = this.maxHp * 0.05;
                    this.hp = Math.min(this.maxHp, this.hp + heal);
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#00ffff', 0));
                    for (let i = 0; i < 8; i++) {
                        effects.push(new RockParticle(this.x + Math.random() * this.width, this.y + Math.random() * this.height, (Math.random() - 0.5) * 4, -Math.random() * 3, '#00ffff'));
                    }
                }
            }

            // ÁP CHẾ
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'apche' && finalDmg > 0) {
                if (Math.random() < 0.05) {
                    this.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 42, 0, 60);
                }
            }

            // SẤM RỀN
            let hasSamRen = (enemy.runes[1] && enemy.runes[1].id === 'samren') || (enemy.runes[2] && enemy.runes[2].id === 'samren');
            if (hasSamRen && finalDmg > 0) {
                let chance = (damageType === 'basic') ? 0.10 : 0.05;
                if (Math.random() < chance) {
                    phuHieuState.projectiles.push(new SamRenThunder(this.x + this.width / 2, this.y + this.height / 2, this, enemy));
                }
            }

            // PHÁN QUYẾT
            if (enemy.runes && enemy.runes[0] && enemy.runes[0].id === 'phanquyet' && !enemy.phanQuyetCd) {
                if (this.hp <= this.maxHp * 0.15 && this.hp > 0) {
                    enemy.phanQuyetCd = 600;
                    let judgeDmg = Math.max(10, Math.floor(this.maxHp * 0.5));
                    effects.push(new LightningZap(this.x + this.width / 2, 0, this.x + this.width / 2, this.y, '#ffffff'));
                    setTimeout(() => {
                        phuHieuState.projectiles.push(new PhanQuyetArrow(this.x + this.width / 2, 0, this, enemy, judgeDmg));
                    }, 500);
                }
            }

            // THÁNH QUYẾT
            if (enemy.runes && enemy.runes[3] && enemy.runes[3].id === 'thanhquyet' && damageType !== 'basic') {
                enemy.thanhQuyetHits = (enemy.thanhQuyetHits || 0) + 1;
                if (enemy.thanhQuyetHits >= 4) {
                    enemy.thanhQuyetHits = 0;
                    this.takeDamage(15, 'thanhquyet');
                    enemy.hp = Math.min(enemy.maxHp, enemy.hp + 15);
                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 60, '#ffd700'));
                    effects.push(new OvalShockwave(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, true, '#ffd700', 0));
                }
            }

            // PHI ĐẠN & PHÁO ĐẠN
            if (damageType !== 'basic' && damageType !== 'rune_bullet' && damageType !== 'phandon_reflect' && damageType !== 'spoison' && damageType !== 'skibidi_laser' && damageType !== 'antonoidon' && damageType !== 'thukhoaa00' && finalDmg > 0) {
                let hasPhiDan = (enemy.runes[1] && enemy.runes[1].id === 'phidan') || (enemy.runes[2] && enemy.runes[2].id === 'phidan');
                let hasPhaoDan = (enemy.runes[1] && enemy.runes[1].id === 'phaodan') || (enemy.runes[2] && enemy.runes[2].id === 'phaodan');

                if (hasPhiDan) spawnRuneBulletAround(enemy, this, 'yellow', 1 + Math.random() * 2);
                if (hasPhaoDan && Math.random() < 0.2) spawnRuneBulletAround(enemy, this, 'purple', 1 + Math.random() * 14);
            }

            if (enemy.tuChienActiveTimer > 0 && damageType === 'basic') {
                enemy.hp = Math.min(enemy.maxHp, enemy.hp + 5);
                spawnCotexAura(enemy);
            }

            // TOTEM HEAL TỰ ĐỘNG & HIẾN TẾ
            if (this.hp <= 0 && !this.isTungTung) {
                if (this.totems > 0) {
                    this.totems--;
                    this.hp = this.maxHp;
                    this.isDead = false;

                    playSkillSound('assets/sounds/sound_skill/totem/death_totem.ogg');
                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 100, '#00ff00'));
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#00ff00', 0));

                    // KÍCH HOẠT VÙNG HIẾN TẾ
                    let hasHienTe = (this.runes[1] && this.runes[1].id === 'hiente') || (this.runes[2] && this.runes[2].id === 'hiente');
                    if (hasHienTe) {
                        phuHieuState.vfx.push(new HienTeWarningArea(this.x + this.width / 2, this.y + this.height / 2, this, enemy));
                    }

                    if (enemy.runes[0] && enemy.runes[0].id === 'daotan') {
                        enemy.daotanBonus = Math.max(0, enemy.daotanBonus - 10);
                    }

                    if (enemy.runes[0] && enemy.runes[0].id === 'trucot') {
                        let lostHp = enemy.maxHp - enemy.hp;
                        if (lostHp > 0) {
                            let heal = lostHp * 0.5;
                            enemy.hp = Math.min(enemy.maxHp, enemy.hp + heal);
                            phuHieuState.vfx.push(new HexagonShieldFX(enemy));
                        }
                    }
                }
            }
        };

        // --- HOOK TRIGGER SKILL ---
        const origTriggerSkill = player.triggerSkill;
        player.triggerSkill = function (skillKey) {
            if (!this.chamMaChacReady) {
                this.chamMaChacTimer = 0;
            }

            if (this.tienLenStage === 1) {
                return; // Đang tụ tiến lên thì không dùng được chiêu
            }

            if (this.isTungTung) {
                if (this.isSilenced || this.hasStatus('stuncc')) return;

                if (skillKey === 'basic' && this.cds.basic <= 0) {
                    this.startChannel('tungtung_basic', 24);
                    this.cds.basic = 60;
                } else if (skillKey === 'c1' && this.cds.c1 <= 0) {
                    this.executeSkill('tungtung_c1');
                    this.cds.c1 = 300;
                } else if (skillKey === 'c2' && this.cds.c2 <= 0) {
                    this.executeSkill('tungtung_c2');
                    this.cds.c2 = 462;
                } else if (skillKey === 'c3' && this.cds.c3 <= 0) {
                    this.startChannel('tungtung_c3', 36);
                    this.cds.c3 = 660;
                }
                return;
            }

            // ĐẠI BÁC KHÔNG KHÍ (SAU ĐÁNH THƯỜNG 0.2S)
            if (skillKey === 'basic' && this.runes && this.runes[3] && this.runes[3].id === 'daibackhongkhi') {
                setTimeout(() => {
                    if (this.isDead) return;
                    let dir = this.facingRight ? 1 : -1;
                    let px = this.facingRight ? this.x + this.width + 5 : this.x - 20;
                    projectiles.push(new AirCannonBall(px, this.y + 10, dir * 25, this));
                }, 200);
            }

            // MA CHẢM (ĐÁNH THÊM 1 ĐÒN ĐÁNH THƯỜNG 50% DAME SAU 0.2S)
            if (skillKey === 'basic' && this.runes && this.runes[3] && this.runes[3].id === 'macham') {
                setTimeout(() => {
                    if (this.isDead) return;
                    origExecuteSkill.call(this, 'basic');
                }, 200);
            }

            origTriggerSkill.call(this, skillKey);

            if (this.isMaPhapActive) {
                if (this.cds[skillKey] !== undefined) {
                    this.cds[skillKey] = Math.min(this.cds[skillKey], 9);
                }
            }
        };

        // --- HOOK EXECUTE SKILL ---
        const origExecuteSkill = player.executeSkill;
        player.executeSkill = function (skillKey) {
            if (this.isTungTung) {
                let enemy = (this === player1) ? player2 : player1;
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;

                if (skillKey === 'tungtung_basic') {
                    let angleToEnemy = Math.atan2((enemy.y + enemy.height / 2) - cy, (enemy.x + enemy.width / 2) - cx);
                    let facingAngle = this.facingRight ? 0 : Math.PI;
                    let angleDiff = Math.abs(Math.atan2(Math.sin(angleToEnemy - facingAngle), Math.cos(angleToEnemy - facingAngle)));

                    effects.push(new TungTungSpaceCrack(cx, cy, this.facingRight, 10 * Math.PI / 180, canvas.width * 1.5, '#00ffff'));

                    if (angleDiff <= (10 * Math.PI / 180) && !enemy.isDead) {
                        enemy.takeDamage(20);
                        enemy.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 30, 0, 60);
                        effects.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 40, '#00ffff'));
                    }
                } else if (skillKey === 'tungtung_c1') {
                    projectiles.push(new BoombadinoCrocodinoPlane(40, true, this));
                    projectiles.push(new BoombadinoCrocodinoPlane(80, false, this));
                } else if (skillKey === 'tungtung_c2') {
                    for (let i = 0; i < 3; i++) {
                        let rx = (i === 0) ? enemy.x + (Math.random() - 0.5) * 80 : 100 + Math.random() * (canvas.width - 200);
                        let ry = (i === 0) ? enemy.y + (Math.random() - 0.5) * 60 : 100 + Math.random() * (canvas.height - groundHeight - 150);
                        phuHieuState.vfx.push(new TungTungSpaceRift(rx, ry, this));
                    }
                } else if (skillKey === 'tungtung_c3') {
                    let angleToEnemy = Math.atan2((enemy.y + enemy.height / 2) - cy, (enemy.x + enemy.width / 2) - cx);
                    let facingAngle = this.facingRight ? 0 : Math.PI;
                    let angleDiff = Math.abs(Math.atan2(Math.sin(angleToEnemy - facingAngle), Math.cos(angleToEnemy - facingAngle)));

                    effects.push(new TungTungSpaceCrack(cx, cy, this.facingRight, 30 * Math.PI / 180, canvas.width * 1.5, '#ff00ff', true));

                    if (angleDiff <= (30 * Math.PI / 180) && !enemy.isDead) {
                        enemy.takeDamage(45);
                        enemy.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 60, 0, 60);
                        effects.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 70, '#ff00ff'));
                        canvas.style.transform = `translate(${(Math.random() - 0.5) * 20}px, ${(Math.random() - 0.5) * 20}px)`;
                        setTimeout(() => canvas.style.transform = 'none', 150);
                    }
                }
                return;
            }

            origExecuteSkill.call(this, skillKey);

            if (this.isMaPhapActive) {
                ['c1', 'c2', 'c3'].forEach(k => {
                    if (this.cds[k] > 9) this.cds[k] = 9;
                });
            }

            if (this.runes[3] && this.runes[3].id === 'sieutoc') {
                if (this.sieuTocStacks < 100) {
                    this.sieuTocStacks++;
                    this.baseSpeed = (this.heroType === 'greninja' ? 6.5 : 5.5) * (1 + this.sieuTocStacks * 0.04);
                }
            }
        };

        // --- HOOK UPDATE ---
        const origUpdate = player.update;
        player.update = function () {
            let enemy = (this === player1) ? player2 : player1;

            if (this.phanQuyetCd > 0) this.phanQuyetCd--;
            if (this.tuChienCd > 0) this.tuChienCd--;
            if (this.tuChienActiveTimer > 0) this.tuChienActiveTimer--;
            if (this.trinhSatDoanCd > 0) this.trinhSatDoanCd--;
            if (this.bomMuCd > 0) this.bomMuCd--;
            if (this.cucTrauShieldTimer > 0) this.cucTrauShieldTimer--;
            if (this.hoDenCd > 0) this.hoDenCd--;

            // BÀN CHÂN LÒ XO (TỰ ĐỘNG NẢY THÊM & TĂNG SÁT THƯƠNG)
            if (this.runes && this.runes[0] && this.runes[0].id === 'banchanloxo') {
                if (this.vy < -2 && !this.onGround && !this.isAutoSpringJumping && this.jumpCount === 1) {
                    this.isAutoSpringJumping = true;
                    setTimeout(() => {
                        if (!this.onGround && !this.isDead) {
                            this.vy = this.jumpPower * 0.9;
                            this.banChanLoXoBonus = (this.banChanLoXoBonus || 0) + 0.25;
                            effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height, true, '#00ff00', Math.PI / 2));
                        }
                    }, 120);
                }
                if (this.onGround) {
                    this.isAutoSpringJumping = false;
                }
            }

            // TÚI KHÍ (LƯỚT NHẬN GIÁP ẢO)
            if (this.runes && this.runes[0] && this.runes[0].id === 'tuikhi') {
                if (this.isDashing && this.dashTimer === 14) {
                    let shieldVal = Math.floor(this.maxHp * 0.15);
                    this.addStatus('bhshield', 'buff', 'assets/icon/buff/mode/bhshield.png', 300, shieldVal, 60);
                }
            }

            // VỎ CHUỐI
            if (this.runes && this.runes[0] && this.runes[0].id === 'vochuoi') {
                let isMoving = Math.abs(this.vx) > 0.5;
                if (isMoving) {
                    this.voChuoiTimer = (this.voChuoiTimer || 0) + 1;
                    if (this.voChuoiTimer >= 150) { // 2.5s
                        this.voChuoiTimer = 0;
                        if ((phuHieuState.bananaPeels || []).length < 10) {
                            phuHieuState.bananaPeels.push(new BananaPeelEntity(this.x + this.width / 2, this.y + this.height - 5, this));
                        }
                    }
                }
            }

            // XỬ LÝ KHI BỊ TRƯỢT VỎ CHUỐI
            if (this.voChuoiSlippedTimer > 0) {
                this.voChuoiSlippedTimer--;
                this.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 10, 0, 60);
            }

            // KHĂN TRÙM THỜI GIAN
            if (this.runes && this.runes[0] && this.runes[0].id === 'khantrumthoigian') {
                this.khanTrumTimer = (this.khanTrumTimer || 0) + 1;
                
                if (this.khanTrumTimer === 1) {
                    this.khanTrumSnap = {
                        hp: this.hp,
                        totems: this.totems,
                        cds: { ...this.cds }
                    };
                }
                
                if (this.khanTrumTimer === 240) { // 4s
                    if (this.khanTrumSnap) {
                        this.hp = this.khanTrumSnap.hp;
                        this.totems = this.khanTrumSnap.totems;
                        this.cds = { ...this.khanTrumSnap.cds };
                        this.khanTrumAnimTimer = 45; 
                        effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 70, '#ff00ff'));
                    }
                }

                if (this.khanTrumTimer >= 600) { // 10s
                    this.khanTrumTimer = 0;
                }
            }

            // ĐÈN PIN THU NHỎ
            if (this.runes && this.runes[0] && this.runes[0].id === 'denpinthunho') {
                if (!this.denPinApplied && enemy) {
                    this.denPinApplied = true;
                    enemy.denPinTimer = 3600; // 60s
                    enemy.width = 15;
                    enemy.height = 25;
                    effects.push(new Explosion(enemy.x, enemy.y, 60, '#ffff00'));
                }
            }

            if (this.denPinTimer > 0) {
                this.denPinTimer--;
                if (this.denPinTimer <= 0) {
                    this.width = 30;
                    this.height = 50;
                    effects.push(new Explosion(this.x, this.y, 60, '#00ffff'));
                }
            }

            // XE ÔM CÔNG NGHỆ (TẠO VÙNG BỤI MỖI 75PX)
            let hasXeOm = (this.runes[1] && this.runes[1].id === 'xeomcongnghe') || (this.runes[2] && this.runes[2].id === 'xeomcongnghe');
            if (hasXeOm) {
                let dist = Math.hypot(this.vx, this.vy);
                this.xeOmAccumulator = (this.xeOmAccumulator || 0) + dist;
                if (this.xeOmAccumulator >= 75) {
                    this.xeOmAccumulator -= 75;
                    phuHieuState.gasClouds.push(new XeOmGasCloud(this.x + this.width / 2, this.y + this.height - 10, this));
                }
            }

            // TRÁNH DỒN (HỒI LIMIT MỖI 1S)
            let hasTranhDon = (this.runes[1] && this.runes[1].id === 'tranhdon') || (this.runes[2] && this.runes[2].id === 'tranhdon');
            if (hasTranhDon) {
                this.tranhDonTimer = (this.tranhDonTimer || 0) + 1;
                if (this.tranhDonTimer >= 60) {
                    this.tranhDonTimer = 0;
                    this.tranhDonCurrent = 50;
                }
            }

            // VÔ HẠ HẠN (5S BẬT, 5S TẮT)
            let hasVoHaHan = (this.runes[1] && this.runes[1].id === 'vohahan') || (this.runes[2] && this.runes[2].id === 'vohahan');
            if (hasVoHaHan) {
                this.voHaHanTimer = (this.voHaHanTimer || 0) + 1;
                if (this.voHaHanTimer <= 300) {
                    this.voHaHanActive = true;
                    let shieldRadius = 90;
                    let cx = this.x + this.width / 2;
                    let cy = this.y + this.height / 2;

                    // Đẩy địch ra rìa trục X
                    if (enemy && !enemy.isDead) {
                        let edist = Math.hypot((enemy.x + enemy.width / 2) - cx, (enemy.y + enemy.height / 2) - cy);
                        if (edist < shieldRadius) {
                            let pushDir = (enemy.x >= cx) ? 1 : -1;
                            enemy.x = cx + pushDir * shieldRadius - enemy.width / 2;
                            enemy.vx = pushDir * 8;
                        }
                    }

                    // Dính và đẩy đạn địch ra rìa trục X (không cho bay xuyên vào)
                    for (let proj of projectiles) {
                        if (proj.owner !== this && proj.active) {
                            let pdist = Math.hypot((proj.x + (proj.width || 10) / 2) - cx, (proj.y + (proj.height || 10) / 2) - cy);
                            if (pdist < shieldRadius) {
                                let pushDir = (proj.x >= cx) ? 1 : -1;
                                proj.x = cx + pushDir * shieldRadius;
                                proj.vx = pushDir * Math.abs(proj.vx || 8);
                            }
                        }
                    }
                } else if (this.voHaHanTimer > 300) {
                    this.voHaHanActive = false;
                    if (this.voHaHanTimer >= 600) {
                        this.voHaHanTimer = 0;
                    }
                }
            }

            // LÙA BÒ (MỖI 2.5S SPAWN BÒ CÓ SỪNG)
            if (this.runes && this.runes[3] && this.runes[3].id === 'luabo') {
                this.luaBoTimer = (this.luaBoTimer || 0) + 1;
                if (this.luaBoTimer >= 150) { // 2.5s
                    this.luaBoTimer = 0;
                    let fromLeft = Math.random() < 0.5;
                    let sx = fromLeft ? -50 : canvas.width + 50;
                    let sy = canvas.height - groundHeight - 35;
                    phuHieuState.bulls.push(new HornedBullEntity(sx, sy, fromLeft ? 1 : -1, this, enemy));
                }
            }

            // TIẾN LÊN
            if (this.runes && this.runes[3] && this.runes[3].id === 'tienlen') {
                if (this.isDashing && this.tienLenStage === 0) {
                    this.tienLenStage = 1;
                    this.tienLenTimer = 0;
                    this.tienLenStacks = 0;
                    this.vx = 0; this.vy = 0;
                }

                if (this.tienLenStage === 1) { // 5s đứng yên tích lũy
                    this.vx = 0;
                    this.speed = 0;
                    this.cds.dash = 300;
                    this.cds.c1 = 300; this.cds.c2 = 300; this.cds.c3 = 300;
                    this.tienLenTimer++;

                    if (this.tienLenTimer % 20 === 0) { // mỗi 1/3s +1 tầng
                        this.tienLenStacks++;
                    }

                    if (this.tienLenTimer >= 300) { // Hết 5s chuyển sang chế độ tăng tốc
                        this.tienLenStage = 3;
                        this.tienLenTimer = 0;
                    }
                } else if (this.tienLenStage === 3) {
                    this.tienLenTimer++;
                    let extraSpeedPct = Math.floor(this.tienLenTimer / 60) * 0.05;
                    this.speed = (this.baseSpeed || 5.5) * (1 + extraSpeedPct);

                    if (this.tienLenTimer % 20 === 0) {
                        this.tienLenStacks++;
                    }

                    // Va chạm với địch
                    if (enemy && checkCollision(this, enemy)) {
                        let dmg = Math.max(1, Math.pow(this.tienLenStacks / 4, 2) - 1);
                        enemy.takeDamage(dmg, 'tienlen');
                        enemy.vx = (this.facingRight ? 1 : -1) * 25;
                        enemy.vy = -8;
                        effects.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 80, '#ff4500'));

                        this.tienLenStage = 0;
                        this.tienLenStacks = 0;
                        this.tienLenTimer = 0;
                        this.cds.dash = 300; // phạt 5s Dash
                        this.speed = this.baseSpeed || 5.5; // Trả về tốc độ gốc
                    }
                }
            }

            // MUỖI (KHỞI TẠO NẾU CHƯA CÓ)
            if (this.runes && this.runes[0] && this.runes[0].id === 'muoi') {
                if (!this.muoiList || this.muoiList.length === 0) {
                    this.muoiList = [];
                    for (let i = 0; i < 5; i++) {
                        let m = new MosquitoEntity(this, enemy);
                        this.muoiList.push(m);
                        phuHieuState.mosquitoes.push(m);
                    }
                }
            }

            // ĐÔI CÁNH TỰ DO
            if (this.runes && this.runes[0] && this.runes[0].id === 'doicanhtudo') {
                this.peakY = null;
            }

            // BÓNG MA
            let hasBongMa = (this.runes[1] && this.runes[1].id === 'bongma') || (this.runes[2] && this.runes[2].id === 'bongma');
            if (hasBongMa) {
                if (!this.shadowRunePos) {
                    this.shadowRunePos = { x: this.x, y: this.y };
                }
                if (this.isDashing && this.dashTimer === 14) {
                    this.cds.dash = 30;
                    let curX = this.x;
                    let curY = this.y;
                    this.x = this.shadowRunePos.x;
                    this.y = this.shadowRunePos.y;
                    this.shadowRunePos.x = curX;
                    this.shadowRunePos.y = curY;
                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 40, '#00ffff'));
                    effects.push(new Explosion(this.shadowRunePos.x + 15, this.shadowRunePos.y + 25, 40, '#222222'));
                }
            }

            // CHẬM MÀ CHẮC (TÍCH ĐỦ 15S KHÔNG TẤN CÔNG)
            let hasChamMaChac = (this.runes[3] && this.runes[3].id === 'chammachac');
            if (hasChamMaChac) {
                if (!this.chamMaChacReady) {
                    this.chamMaChacTimer = (this.chamMaChacTimer || 0) + 1;
                    if (this.chamMaChacTimer >= 900) {
                        this.chamMaChacReady = true;
                    }
                }
            }

            // THỦ KHOA A00 LOGIC
            let hasThuKhoaA00 = (this.runes[3] && this.runes[3].id === 'thukhoaa00');
            if (hasThuKhoaA00) {
                this.a00Timer = (this.a00Timer || 0) + 1;

                if (this.a00Timer === 120) {
                    this.a00Num1 = Math.floor(Math.random() * 11);
                    this.a00Op = null;
                    this.a00Num2 = null;
                    this.a00Result = null;
                } else if (this.a00Timer === 240) {
                    const basicOps = ['+', '-', '*', '/', '^', '√'];
                    this.a00Op = basicOps[Math.floor(Math.random() * basicOps.length)];
                } else if (this.a00Timer === 360) {
                    if (this.a00Op === '^') {
                        let num1 = (this.a00Num1 !== null) ? this.a00Num1 : 2;
                        let s2Max = Math.max(0, 10 - 0.085 * Math.pow(num1, 2));
                        let r2 = Math.random();
                        if (r2 < 0.85) {
                            this.a00Num2 = Math.max(0, Math.floor(Math.random() * (s2Max + 1)));
                        } else if (r2 < 0.95) {
                            this.a00Num2 = Math.floor(s2Max + Math.random() * 1.5);
                        } else {
                            this.a00Num2 = Math.floor(1 + Math.random() * 10);
                        }
                    } else if (this.a00Op === '√') {
                        this.a00Num2 = Math.floor(20 + Math.random() * 81);
                        if (this.a00Num1 === 0 || this.a00Num1 === 1) {
                            this.a00Num1 = 2;
                        }
                    } else {
                        this.a00Num2 = Math.floor(Math.random() * 11);
                        if (this.a00Op === '/' && this.a00Num2 === 0) {
                            this.a00Num2 = 1;
                        }
                    }
                } else if (this.a00Timer === 420) {
                    let n1 = (this.a00Num1 !== null) ? this.a00Num1 : 0;
                    let n2 = (this.a00Num2 !== null) ? this.a00Num2 : 0;
                    let rawRes = 0;

                    if (this.a00Op === '+') rawRes = n1 + n2;
                    else if (this.a00Op === '-') rawRes = Math.max(0, n1 - n2);
                    else if (this.a00Op === '*') rawRes = n1 * n2;
                    else if (this.a00Op === '/') rawRes = (n2 !== 0) ? (n1 / n2) : n1;
                    else if (this.a00Op === '^') rawRes = Math.pow(n1, n2);
                    else if (this.a00Op === '√') {
                        let root = (n1 === 0 || n1 === 1) ? 2 : n1;
                        rawRes = Math.pow(n2, 1 / root);
                    }

                    if (this.a00Op === '√' && (this.a00Num1 === 2 || this.a00Num1 === 0 || this.a00Num1 === 1)) {
                        this.a00Result = Math.max(1, Math.round(rawRes));
                    } else {
                        this.a00Result = Math.max(1, Math.ceil(rawRes));
                    }
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#ff00ff', 0));
                } else if (this.a00Timer >= 480) {
                    let dmg = (this.a00Result !== null) ? this.a00Result : 10;
                    let spawnX = this.facingRight ? this.x + this.width + 10 : this.x - 20;
                    let spawnY = this.y + 15;

                    phuHieuState.projectiles.push(new ThuKhoaA00Projectile(spawnX, spawnY, enemy, this, dmg));
                    effects.push(new Explosion(spawnX, spawnY, 40, '#00ffff'));

                    this.a00Timer = 0;
                    this.a00Num1 = null;
                    this.a00Op = null;
                    this.a00Num2 = null;
                    this.a00Result = null;
                }
            }

            // MA PHÁP LIÊN HỒI
            let hasMaPhapLienHoi = (this.runes[3] && this.runes[3].id === 'maphaplienhoi');
            if (hasMaPhapLienHoi) {
                this.maPhapLienHoiTimer = (this.maPhapLienHoiTimer || 0) + 1;
                if (this.maPhapLienHoiTimer === 1) {
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#ff00ff', 0));
                }
                if (this.maPhapLienHoiTimer <= 300) {
                    this.isMaPhapActive = true;
                    this.cds.c1 = Math.min(this.cds.c1, 9);
                    this.cds.c2 = Math.min(this.cds.c2, 9);
                    this.cds.c3 = Math.min(this.cds.c3, 9);
                } else if (this.maPhapLienHoiTimer > 300) {
                    this.isMaPhapActive = false;
                    if (this.maPhapLienHoiTimer >= 900) {
                        this.maPhapLienHoiTimer = 0;
                    }
                }
            } else {
                this.isMaPhapActive = false;
            }

            // ĂN TO NÓI LỚN
            let hasAnToNoiLon = (this.runes[1] && this.runes[1].id === 'antonoidon') || (this.runes[2] && this.runes[2].id === 'antonoidon');
            if (hasAnToNoiLon) {
                initMicForRune();
                let vol = getMicVolume();
                this.currentMicVol = vol;

                if (vol > 20) {
                    this.anToNoiLonTimer = (this.anToNoiLonTimer || 0) + 1;
                    if (this.anToNoiLonTimer >= 9) {
                        this.anToNoiLonTimer = 0;
                        this.hp = Math.min(this.maxHp, this.hp + 1);
                        phuHieuState.vfx.push(new AnToNoiLonWave(this));
                    }
                }
            }

            // HƯ THỨC TỬ
            let isStunned = this.hasStatus('stuncc');
            if (!this.lastStunState && isStunned) {
                if ((enemy.runes[1] && enemy.runes[1].id === 'huthuctu') || (enemy.runes[2] && enemy.runes[2].id === 'huthuctu')) {
                    phuHieuState.vfx.push(new GojoFullUltFX(enemy, this));
                }
            }
            this.lastStunState = isStunned;

            // ĐIÊN CUỒNG
            let hasDienCuong = (this.runes[1] && this.runes[1].id === 'diencuong') || (this.runes[2] && this.runes[2].id === 'diencuong');
            if (hasDienCuong && this.cds.basic > 0) {
                this.cds.basic = Math.max(0, this.cds.basic - 1);
            }

            // LỜI THÌ THẦM CỦA GIÓ
            let hasLoiGio = (this.runes[1] && this.runes[1].id === 'loithithamcuagio') || (this.runes[2] && this.runes[2].id === 'loithithamcuagio');
            if (hasLoiGio) {
                let dist = Math.hypot(this.vx, this.vy);
                this.moveDistAccumulator = (this.moveDistAccumulator || 0) + dist;
                if (this.moveDistAccumulator >= 200) {
                    this.moveDistAccumulator -= 200;
                    ['c1', 'c2', 'c3'].forEach(k => {
                        if (this.cds[k] > 0) this.cds[k] = Math.max(0, this.cds[k] - 60);
                    });
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#00ffff', 0));
                }
            }

            // HẤP HỐI
            let hasHapHoi = (this.runes[1] && this.runes[1].id === 'haphoi') || (this.runes[2] && this.runes[2].id === 'haphoi');
            if (hasHapHoi) {
                let lostHpPct = ((this.maxHp - this.hp) / this.maxHp) * 100;
                let speedBuff = Math.floor(lostHpPct / 5) * 0.04;
                this.speed = this.baseSpeed * (1 + speedBuff);
            }

            // LIÊN BẠO KÍCH
            if (this.runes[3] && this.runes[3].id === 'lienbaokich') {
                this.lienBaoKichTimer = (this.lienBaoKichTimer || 0) + 1;
                if (this.lienBaoKichTimer >= 60) {
                    this.lienBaoKichTimer = 0;
                    for (let burst = 0; burst < 3; burst++) {
                        setTimeout(() => {
                            if (this.isDead) return;
                            for (let i = 0; i < 20; i++) {
                                let angle = Math.random() * Math.PI * 2;
                                let spd = 8 + Math.random() * 8;
                                let dmg = 2 + Math.random() * 2;
                                let px = this.x + this.width / 2;
                                let py = this.y + this.height / 2;
                                phuHieuState.projectiles.push(new LienBaoKichBullet(px, py, Math.cos(angle) * spd, Math.sin(angle) * spd, enemy, dmg));
                            }
                        }, burst * 100);
                    }
                }
            }

            // TỬ CHIẾN
            if (this.runes[3] && this.runes[3].id === 'tuchien') {
                if (this.hp <= 50 && this.tuChienCd <= 0 && this.tuChienActiveTimer <= 0) {
                    this.tuChienCd = 1500;
                    this.tuChienActiveTimer = 300;

                    for (let i = projectiles.length - 1; i >= 0; i--) {
                        if (projectiles[i].owner !== this) projectiles[i].active = false;
                    }
                    this.hp = Math.min(this.maxHp, this.hp + 10);
                    this.addStatus('ironbody', 'buff', 'assets/icon/buff/ironbody.png', 300, 0, 60);
                    effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, 120, '#ff0055'));
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height / 2, true, '#ff0055', 0));
                }
            }

            // KIM JONG UN
            if (this.runes[3] && this.runes[3].id === 'kimjongun') {
                this.kimJongUnTimer = (this.kimJongUnTimer || 0) + 1;
                if (this.kimJongUnTimer >= 15) {
                    this.kimJongUnTimer = 0;
                    for (let i = 0; i < 3; i++) {
                        let rx = Math.random() * (canvas.width - 40);
                        projectiles.push(new KimJongUnBomb(rx, -20, this));
                    }
                }
            }

            // CÀO CÀO
            if (this.runes && this.runes[0] && this.runes[0].id === 'caocao') {
                if (this.onGround) {
                    this.groundedTimer = (this.groundedTimer || 0) + 1;
                    if (this.groundedTimer >= 300 && !this.caocaoCharged) {
                        this.caocaoCharged = true;
                        effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height, true, '#00ff00', Math.PI / 2));
                    }
                } else {
                    this.groundedTimer = 0;
                }

                if (this.caocaoCharged && !this.onGround && this.vy < 0) {
                    this.vy *= 2.0;
                    this.caocaoCharged = false;
                    this.groundedTimer = 0;
                    effects.push(new OvalShockwave(this.x + this.width / 2, this.y + this.height, true, '#00ff00', Math.PI / 2));
                }
            }

            origUpdate.call(this);
        };

        // --- HOOK DRAW ---
        const origDraw = player.draw;
        player.draw = function () {
            let enemy = (this === player1) ? player2 : player1;

            // HIỆU ỨNG XOAY TRÒN KHI BỊ TRƯỢT VỎ CHUỐI
            if (this.voChuoiSlippedTimer > 0) {
                ctx.save();
                ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
                ctx.rotate(Date.now() / 30);
                ctx.translate(-this.x - this.width / 2, -this.y - this.height / 2);
                origDraw.call(this);
                ctx.restore();
                return;
            }

            // VẼ KHĂN TRÙM THỜI GIAN TRÙM LÊN NGƯỜI
            if (this.khanTrumAnimTimer > 0) {
                this.khanTrumAnimTimer--;
                ctx.save();
                ctx.fillStyle = 'rgba(255, 105, 180, 0.6)';
                ctx.strokeStyle = '#ffff00';
                ctx.lineWidth = 3;
                ctx.fillRect(this.x - 8, this.y - 8, this.width + 16, this.height + 16);
                ctx.strokeRect(this.x - 8, this.y - 8, this.width + 16, this.height + 16);
                
                ctx.strokeStyle = '#fff';
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 14, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // VẼ MẮT MÈO CHO MÈO ĐEN MAY MẮN
            if (this.runes && this.runes[0] && this.runes[0].id === 'meodenmayman') {
                ctx.save();
                let cx = this.x + this.width / 2;
                let topY = this.y - 18;
                ctx.fillStyle = '#ffd700';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffff00';
                
                ctx.beginPath(); ctx.ellipse(cx - 7, topY, 4, 6, -Math.PI / 12, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.ellipse(cx + 7, topY, 4, 6, Math.PI / 12, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#000000';
                ctx.fillRect(cx - 8, topY - 5, 2, 10);
                ctx.fillRect(cx + 6, topY - 5, 2, 10);
                ctx.restore();
            }

            // VẼ LÁ CHẮN TÚI KHÍ
            if (this.hasStatus('bhshield') && this.runes && this.runes[0] && this.runes[0].id === 'tuikhi') {
                ctx.save();
                ctx.strokeStyle = 'rgba(0, 255, 255, 0.45)';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 12;
                ctx.shadowColor = '#00ffff';
                ctx.beginPath();
                ctx.ellipse(this.x + this.width / 2, this.y + this.height / 2, 28, 38, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // VẼ VÔ HẠ HẠN BARRIER
            if (this.voHaHanActive && ((this.runes[1] && this.runes[1].id === 'vohahan') || (this.runes[2] && this.runes[2].id === 'vohahan'))) {
                ctx.save();
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;
                ctx.strokeStyle = 'rgba(0, 191, 255, 0.7)';
                ctx.lineWidth = 2.5;
                ctx.setLineDash([6, 6]);
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#00bfff';
                ctx.beginPath();
                ctx.arc(cx, cy, 90 + Math.sin(Date.now() / 100) * 4, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            // VẼ LỰC CẢN KHÔNG KHÍ KHI TIẾN LÊN
            if (this.tienLenStage === 3) {
                ctx.save();
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;
                let dir = this.facingRight ? 1 : -1;
                
                ctx.strokeStyle = 'rgba(255, 69, 0, 0.8)';
                ctx.lineWidth = 4;
                ctx.beginPath();
                ctx.arc(cx + dir * 15, cy, 35, -Math.PI / 2, Math.PI / 2, !this.facingRight);
                ctx.stroke();

                for (let k = 0; k < 3; k++) {
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
                    ctx.lineWidth = 2;
                    ctx.beginPath();
                    ctx.moveTo(cx - dir * (20 + k * 10), cy - 20 + k * 20);
                    ctx.lineTo(cx - dir * (50 + k * 15), cy - 20 + k * 20);
                    ctx.stroke();
                }
                ctx.restore();
            }

            // VẼ CÔNG THỨC THỦ KHOA A00
            if (this.runes && this.runes[3] && this.runes[3].id === 'thukhoaa00') {
                ctx.save();
                let cx = this.x + this.width / 2;
                let topY = this.y - 28;

                let strNum1 = (this.a00Num1 !== null) ? `${this.a00Num1}` : '?';
                let strOp = (this.a00Op !== null) ? `${this.a00Op}` : '?';
                let strNum2 = (this.a00Num2 !== null) ? `${this.a00Num2}` : '?';
                let strRes = (this.a00Result !== null) ? `= ${this.a00Result}` : '';

                let formulaStr = `[${strNum1}] [${strOp}] [${strNum2}] ${strRes}`;

                ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 1.5;
                let boxW = ctx.measureText ? Math.max(90, ctx.measureText(formulaStr).width + 16) : 100;
                ctx.fillRect(cx - boxW / 2, topY - 14, boxW, 18);
                ctx.strokeRect(cx - boxW / 2, topY - 14, boxW, 18);

                ctx.fillStyle = (this.a00Result !== null) ? '#ff00ff' : '#00ffff';
                ctx.font = 'bold 12px "Courier New", Courier, monospace';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 6;
                ctx.shadowColor = ctx.fillStyle;
                ctx.fillText(formulaStr, cx, topY);
                ctx.restore();
            }

            if (this.isMaPhapActive) {
                ctx.save();
                ctx.strokeStyle = '#ff00ff';
                ctx.lineWidth = 2.5;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ff00ff';
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 36 + Math.sin(Date.now() / 80) * 4, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            if (this.runes && this.runes[0] && this.runes[0].id === 'doicanhtudo') {
                ctx.save();
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height * 0.35;
                let wingWave = Math.sin(Date.now() / 130) * 0.35;

                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 1.5;

                ctx.save();
                ctx.translate(cx - 10, cy);
                ctx.rotate(-0.25 + wingWave);
                ctx.beginPath();
                ctx.ellipse(-18, -6, 22, 9, -Math.PI / 6, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();
                ctx.restore();

                ctx.save();
                ctx.translate(cx + 10, cy);
                ctx.rotate(0.25 - wingWave);
                ctx.beginPath();
                ctx.ellipse(18, -6, 22, 9, Math.PI / 6, 0, Math.PI * 2);
                ctx.fill(); ctx.stroke();
                ctx.restore();

                ctx.restore();
            }

            if (this.shadowRunePos) {
                ctx.save();
                ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
                ctx.strokeStyle = '#00ffff';
                ctx.lineWidth = 2;
                ctx.fillRect(this.shadowRunePos.x, this.shadowRunePos.y, 30, 50);
                ctx.strokeRect(this.shadowRunePos.x, this.shadowRunePos.y, 30, 50);
                ctx.restore();
            }

            if (this.chamMaChacReady) {
                ctx.save();
                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 3;
                ctx.shadowBlur = 15;
                ctx.shadowColor = '#ffff00';
                ctx.strokeRect(this.x - 6, this.y - 6, this.width + 12, this.height + 12);
                if (Math.random() < 0.4) {
                    effects.push(new LightningZap(this.x + Math.random() * this.width, this.y - 10, this.x + Math.random() * this.width, this.y + this.height + 10, '#ffd700'));
                }
                ctx.restore();
            }

            if (this.cucTrauShieldTimer > 0) {
                ctx.save();
                ctx.strokeStyle = `rgba(139, 69, 19, ${0.4 + Math.random() * 0.4})`;
                ctx.lineWidth = 4;
                ctx.setLineDash([4, 6]);
                ctx.beginPath();
                ctx.arc(this.x + this.width / 2, this.y + this.height / 2, 35 + (Math.random() - 0.5) * 6, 0, Math.PI * 2);
                ctx.stroke();
                ctx.restore();
            }

            if (this.isTungTung) {
                ctx.save();
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;
                let flip = this.facingRight ? 1 : -1;

                let isMoving = Math.abs(this.vx) > 0.5;
                this.tungTungWalkFrame = (this.tungTungWalkFrame || 0) + (isMoving ? 0.3 : 0.05);
                let wobble = Math.sin(this.tungTungWalkFrame) * 6;
                let legWobble = Math.cos(this.tungTungWalkFrame) * 8;

                ctx.strokeStyle = '#ffd700';
                ctx.lineWidth = 2;
                ctx.setLineDash([4, 4]);
                ctx.beginPath();
                ctx.ellipse(cx, this.y + this.height - 2, 22, 6, 0, 0, Math.PI * 2);
                ctx.stroke();
                ctx.setLineDash([]);

                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 14px Arial';
                ctx.textAlign = 'center';
                ctx.shadowBlur = 4;
                ctx.shadowColor = '#000000';
                ctx.fillText(`${this.tungTungLives}/2`, cx, this.y - 15);
                ctx.shadowBlur = 0;

                ctx.translate(cx, cy + wobble);
                ctx.scale(flip, 1);

                ctx.fillStyle = '#ff9900';
                ctx.fillRect(-10, 15, 6, 12 + (isMoving ? legWobble : 0));
                ctx.fillRect(4, 15, 6, 12 - (isMoving ? legWobble : 0));

                ctx.fillStyle = '#8b4513';
                ctx.fillRect(-14, -15, 28, 30);
                ctx.fillStyle = '#d2691e';
                ctx.fillRect(-12, -12, 24, 6);
                ctx.fillRect(-12, 6, 24, 6);

                ctx.fillStyle = '#cd853f';
                ctx.beginPath(); ctx.arc(0, -22, 14, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(3, -24, 4.5, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(10, -23, 3, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000000';
                ctx.beginPath(); ctx.arc(4, -24, 2, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(11, -23, 1.5, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#00ffcc';
                ctx.fillRect(-12, -36, 24, 6);
                ctx.beginPath(); ctx.moveTo(-6, -36); ctx.lineTo(0, -44); ctx.lineTo(6, -36); ctx.fill();

                ctx.save();
                let batAngle = -Math.PI / 4;
                if (this.isChanneling && this.pendingSkill === 'tungtung_basic') {
                    batAngle = -Math.PI * 0.75;
                } else if (this.isChanneling && this.pendingSkill === 'tungtung_c3') {
                    batAngle = -Math.PI * 0.85;
                    ctx.strokeStyle = '#ff00ff';
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(-20, -20, 25 + Math.sin(Date.now() / 40) * 5, 0, Math.PI * 2);
                    ctx.stroke();
                }

                ctx.translate(6, 0);
                ctx.rotate(batAngle);
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(-2, -8, 5, 12);
                ctx.fillStyle = '#deb887';
                ctx.fillRect(-3, -36, 7, 28);
                ctx.fillStyle = '#d2691e';
                ctx.fillRect(-4, -42, 9, 8);
                ctx.restore();

                ctx.restore();
                return;
            }

            if (this.runes && this.runes[0] && this.runes[0].id === 'songdaithanhhuyenthoai') {
                if (this.songDaiSnapTotems !== null && this.totems >= this.songDaiSnapTotems) {
                    ctx.save();
                    ctx.strokeStyle = '#ffd700';
                    ctx.lineWidth = 3;
                    ctx.shadowBlur = 20;
                    ctx.shadowColor = '#ffff00';
                    let cx = this.x + this.width / 2;
                    let cy = this.y + this.height / 2;
                    let t = Date.now() / 150;
                    ctx.beginPath();
                    ctx.arc(cx, cy, 38 + Math.sin(t) * 4, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.arc(cx + Math.cos(t) * 25, cy + Math.sin(t) * 25, 6, 0, Math.PI * 2);
                    ctx.fillStyle = '#ffd700';
                    ctx.fill();
                    ctx.restore();
                }
            }

            if (this.runes && this.runes[0] && this.runes[0].id === 'diemyeu') {
                if (enemy.hp < enemy.maxHp * 0.5) {
                    ctx.save();
                    ctx.strokeStyle = '#ff3300';
                    ctx.lineWidth = 2;
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = '#ff0000';
                    ctx.beginPath();
                    ctx.arc(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 35 + Math.sin(Date.now() / 100) * 5, 0, Math.PI * 2);
                    ctx.stroke();
                    ctx.restore();
                }
            }

            if (this.runes && this.runes[0] && this.runes[0].id === 'tanghinh') {
                this.tangHinhTimer = ((this.tangHinhTimer || 0) + 1) % 300;
                let isFlashing = this.tangHinhTimer >= 270;

                if (isFlashing) {
                    ctx.save();
                    ctx.globalAlpha = 0.2;
                    ctx.translate((Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3);
                    origDraw.call(this);
                    ctx.restore();
                }
            } else {
                if (this.tuChienActiveTimer > 0) {
                    ctx.save();
                    ctx.strokeStyle = '#ff0055';
                    ctx.lineWidth = 4;
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = '#ff0055';
                    ctx.strokeRect(this.x - 4, this.y - 4, this.width + 8, this.height + 8);
                    ctx.restore();
                }
                origDraw.call(this);
            }
        };
    };

    if (player1) setupPlayer(player1);
    if (player2) setupPlayer(player2);
}

function checkAllRunesFull(p1, p2) {
    let p1Full = p1 && p1.runes && p1.runes[3] !== null;
    let p2Full = p2 && p2.runes && p2.runes[3] !== null;
    return p1Full && p2Full;
}

function spawnNuocRutElectricTrail(player) {
    if (Math.random() < 0.6) {
        let x1 = player.x + Math.random() * player.width;
        let y1 = player.y + Math.random() * player.height;
        let x2 = x1 + (Math.random() - 0.5) * 20;
        let y2 = y1 + (Math.random() - 0.5) * 20;
        effects.push(new LightningZap(x1, y1, x2, y2, '#00ffff'));
    }
}

// --- CLASS VỎ CHUỐI ENTITY ---
class BananaPeelEntity {
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.vy = 0;
        this.active = true;
    }

    update() {
        if (!this.active) return;
        this.vy += 0.5;
        this.y += this.vy;

        if (this.y >= canvas.height - groundHeight - 10) {
            this.y = canvas.height - groundHeight - 10;
            this.vy = 0;
        }

        if (platforms) {
            for (let plat of platforms) {
                if (this.x >= plat.x && this.x <= plat.x + plat.w && this.y >= plat.y - 10 && this.y - this.vy <= plat.y) {
                    this.y = plat.y - 10;
                    this.vy = 0;
                }
            }
        }

        let enemy = (this.owner === player1) ? player2 : player1;
        if (enemy && !enemy.isDead && checkCollision({ x: this.x - 8, y: this.y - 5, width: 16, height: 12 }, enemy)) {
            this.active = false;
            enemy.speed *= 2.0;
            setTimeout(() => {
                enemy.speed /= 2.0;
                enemy.voChuoiSlippedTimer = 120; // 2s choáng xoay tròn
            }, 150);
            effects.push(new Explosion(this.x, this.y, 30, '#ffd700'));
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 7, 0, Math.PI);
        ctx.fill();
        ctx.fillStyle = '#8b4513';
        ctx.fillRect(this.x - 1, this.y - 4, 2, 4);
        ctx.restore();
    }
}

// --- CLASS VÙNG KHÓI XE ÔM CÔNG NGHỆ ---
class XeOmGasCloud {
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.timer = 300; // 5s
        this.tickTimer = 0;
        this.active = true;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
            return;
        }

        this.tickTimer++;
        if (this.tickTimer >= 12) { // 0.2s
            this.tickTimer = 0;
            let enemy = (this.owner === player1) ? player2 : player1;
            let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
            if (dist <= 50 && !enemy.isDead) {
                enemy.takeDamage(1, 'xeomgas');
            }
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        let alpha = Math.min(0.4, this.timer / 300);
        ctx.fillStyle = `rgba(0, 255, 100, ${alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 50, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- CLASS VÙNG CẢNH BÁO HIẾN TẾ ---
class HienTeWarningArea {
    constructor(x, y, owner, target) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.target = target;
        this.timer = 300; // 5s
        this.radius = 360;
        this.active = true;
    }

    update() {
        this.timer--;
        let dist = Math.hypot((this.target.x + this.target.width / 2) - this.x, (this.target.y + this.target.height / 2) - this.y);

        if (dist <= this.radius && !this.target.isDead) {
            this.target.addStatus('snowless', 'debuff', 'assets/icon/debuff/snowless.png', 10, 95, 60);
            this.target.cds.dash = Math.max(this.target.cds.dash, 10); 
        }

        if (this.timer <= 0) {
            this.active = false;
            if (dist <= this.radius && !this.target.isDead) {
                this.target.takeDamage(650, 'hiente');
            }
            effects.push(new Explosion(this.x, this.y, this.radius, '#ff0000'));
            canvas.style.transform = `translate(${(Math.random() - 0.5) * 30}px, ${(Math.random() - 0.5) * 30}px)`;
            setTimeout(() => canvas.style.transform = 'none', 200);
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        let progress = 1 - (this.timer / 300);
        ctx.strokeStyle = `rgba(255, 0, 0, ${0.4 + Math.sin(Date.now() / 50) * 0.3})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(255, 0, 0, ${progress * 0.25})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius * progress, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- CLASS HỐ ĐEN (BLACK HOLE VORTEX) ---
class BlackHoleVortex {
    constructor(x, y, owner, target) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.target = target;
        this.timer = 210; // 3.5s
        this.active = true;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
            return;
        }

        if (this.target && !this.target.isDead) {
            let dx = this.x - (this.target.x + this.target.width / 2);
            let dy = this.y - (this.target.y + this.target.height / 2);
            let dist = Math.hypot(dx, dy);

            if (dist > 5 && dist < 450) {
                this.target.x += (dx / dist) * 2.2;
                this.target.y += (dy / dist) * 1.5;
            }
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(Date.now() / 150);

        ctx.fillStyle = '#000000';
        ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();

        for (let i = 1; i <= 3; i++) {
            let r = 18 + i * 15 - ((Date.now() / 15) % 15);
            ctx.strokeStyle = `rgba(138, 43, 226, ${1 - r / 65})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(0, 0, Math.max(1, r), 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.restore();
    }
}

// --- CLASS BÒ HÚC (HORNED BULL ENTITY) ---
class HornedBullEntity {
    constructor(x, y, dir, owner, target) {
        this.x = x;
        this.y = y;
        this.dir = dir;
        this.owner = owner;
        this.target = target;
        this.speed = 9;
        this.vy = 0;
        this.active = true;
    }

    update() {
        this.x += this.dir * this.speed;
        this.vy += 0.5;
        this.y += this.vy;

        if (this.y >= canvas.height - groundHeight - 35) {
            this.y = canvas.height - groundHeight - 35;
            this.vy = 0;
        }

        if (this.target && Math.abs(this.target.x - this.x) < 120 && this.y >= canvas.height - groundHeight - 40 && this.vy === 0) {
            this.vy = -6;
        }

        if (this.target && checkCollision({ x: this.x - 20, y: this.y - 15, width: 40, height: 30 }, this.target)) {
            this.target.takeDamage(20, 'luabo');
            this.target.vy = -8;
            this.target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 150, 0, 60); 
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 60, '#ff4500'));
            return;
        }

        if (this.x < -100 || this.x > canvas.width + 100) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.dir, 1);

        ctx.fillStyle = '#8b4513';
        ctx.fillRect(-22, -12, 44, 24);

        ctx.fillRect(-18, 12, 6, 12);
        ctx.fillRect(12, 12, 6, 12);

        ctx.fillStyle = '#5c2c16';
        ctx.fillRect(16, -18, 16, 18);

        ctx.fillStyle = '#f5f5f5';
        ctx.beginPath();
        ctx.moveTo(24, -18); ctx.lineTo(36, -28); ctx.lineTo(28, -14); ctx.fill();

        ctx.restore();
    }
}

// --- CLASS MUỖI ENTITY ---
class MosquitoEntity {
    constructor(owner, target) {
        this.owner = owner;
        this.target = target;
        this.x = owner.x + (Math.random() - 0.5) * 80;
        this.y = owner.y - 40 + (Math.random() - 0.5) * 40;
        this.state = 'idle'; 
        this.timer = 180 + Math.floor(Math.random() * 240); 
        this.chaseTimer = 0;
        this.active = true;
    }

    update() {
        if (!this.owner || this.owner.isDead) return;

        if (this.state === 'idle') {
            this.x += (Math.random() - 0.5) * 3;
            this.y += (Math.random() - 0.5) * 3;
            this.timer--;

            if (this.timer <= 0) {
                this.state = 'chase';
                this.chaseTimer = 420; 
            }
        } else if (this.state === 'chase') {
            this.chaseTimer--;
            let dx = (this.target.x + this.target.width / 2) - this.x;
            let dy = (this.target.y + this.target.height / 2) - this.y;
            let dist = Math.hypot(dx, dy);

            if (dist < 15) {
                this.target.takeDamage(2, 'muoi');
                this.state = 'return';
            } else {
                this.x += (dx / dist) * 4.5;
                this.y += (dy / dist) * 4.5;
            }

            if (this.chaseTimer <= 0) {
                this.state = 'idle';
                this.timer = 180 + Math.floor(Math.random() * 240);
            }
        } else if (this.state === 'return') {
            let dx = (this.owner.x + this.owner.width / 2) - this.x;
            let dy = (this.owner.y + this.owner.height / 2) - this.y;
            let dist = Math.hypot(dx, dy);

            if (dist < 15) {
                this.owner.hp = Math.min(this.owner.maxHp, this.owner.hp + 2);
                effects.push(new DamageText(this.owner.x, this.owner.y - 15, "+2", '#00ff00'));
                this.state = 'idle';
                this.timer = 180 + Math.floor(Math.random() * 240);
            } else {
                this.x += (dx / dist) * 7.5; 
                this.y += (dy / dist) * 7.5;
            }
        }
    }

    draw() {
        ctx.save();
        ctx.fillStyle = '#111111';
        ctx.beginPath(); ctx.arc(this.x, this.y, 2.5, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.lineWidth = 1;
        let wingWiggle = Math.sin(Date.now() / 20) * 4;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 3, this.y - 4 + wingWiggle);
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 3, this.y - 4 - wingWiggle);
        ctx.stroke();
        ctx.restore();
    }
}

// --- CLASS ĐẠN THỦ KHOA A00 ---
class ThuKhoaA00Projectile {
    constructor(x, y, target, owner, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.owner = owner;
        this.damage = damage;
        this.speed = 18;
        this.active = true;
        this.rot = 0;
    }

    update() {
        if (!this.target || this.target.isDead) {
            this.active = false;
            return;
        }

        this.rot += 0.1;
        let dx = (this.target.x + this.target.width / 2) - this.x;
        let dy = (this.target.y + this.target.height / 2) - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 22) {
            this.target.takeDamage(this.damage, 'thukhoaa00');
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 60, '#00ffff'));
            return;
        }

        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;

        if (Math.random() < 0.5) {
            effects.push(new RockParticle(this.x, this.y, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, '#00ffff'));
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(0, 0, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px "Courier New", Courier, monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${this.damage}`, 0, 0);

        ctx.restore();
    }
}

// --- UPDATE LOGIC MỖI FRAME ---
function updatePhuHieuMode(p1, p2, ctx) {
    if (!phuHieuState.active) return;

    if (phuHieuState.flashWhiteTimer > 0) {
        phuHieuState.flashWhiteTimer--;
        let alpha = Math.min(1, phuHieuState.flashWhiteTimer / 45);
        ctx.save();
        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.95})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();
    }

    if (checkAllRunesFull(p1, p2)) {
        phuHieuState.items = [];
    } else {
        phuHieuState.spawnTimer++;

        if (phuHieuState.spawnTimer >= 300) {
            phuHieuState.spawnTimer = 0;
            if (phuHieuState.items.length < 3) {
                let spawnX = 100 + Math.random() * (canvas.width - 200);
                let spawnY = canvas.height - groundHeight - 30;

                if (platforms && platforms.length > 0 && Math.random() < 0.7) {
                    let plat = platforms[Math.floor(Math.random() * platforms.length)];
                    spawnX = plat.x + Math.random() * (plat.w - 20);
                    spawnY = plat.y - 25;
                }
                phuHieuState.items.push({ x: spawnX, y: spawnY, w: 25, h: 25, floatOffset: 0 });
            }
        }
    }

    // UPDATE VỎ CHUỐI
    for (let i = (phuHieuState.bananaPeels || []).length - 1; i >= 0; i--) {
        let bp = phuHieuState.bananaPeels[i];
        bp.update();
        bp.draw();
        if (!bp.active) phuHieuState.bananaPeels.splice(i, 1);
    }

    // UPDATE KHÓI XE ÔM
    for (let i = (phuHieuState.gasClouds || []).length - 1; i >= 0; i--) {
        let gc = phuHieuState.gasClouds[i];
        gc.update();
        gc.draw();
        if (!gc.active) phuHieuState.gasClouds.splice(i, 1);
    }

    // UPDATE HỐ ĐEN
    for (let i = (phuHieuState.blackHoles || []).length - 1; i >= 0; i--) {
        let bh = phuHieuState.blackHoles[i];
        bh.update();
        bh.draw();
        if (!bh.active) phuHieuState.blackHoles.splice(i, 1);
    }

    // UPDATE BÒ HÚC
    for (let i = (phuHieuState.bulls || []).length - 1; i >= 0; i--) {
        let b = phuHieuState.bulls[i];
        b.update();
        b.draw();
        if (!b.active) phuHieuState.bulls.splice(i, 1);
    }

    // UPDATE MUỖI
    for (let i = (phuHieuState.mosquitoes || []).length - 1; i >= 0; i--) {
        let m = phuHieuState.mosquitoes[i];
        m.update();
        m.draw();
        if (!m.active) phuHieuState.mosquitoes.splice(i, 1);
    }

    // UPDATE CỨC TRÂU
    for (let i = (phuHieuState.cucTrauList || []).length - 1; i >= 0; i--) {
        let ct = phuHieuState.cucTrauList[i];
        ct.timer--;
        if (ct.timer <= 0) {
            phuHieuState.cucTrauList.splice(i, 1);
            continue;
        }

        ctx.save();
        ctx.fillStyle = '#5c3a21';
        ctx.beginPath();
        ctx.ellipse(ct.x + 10, ct.y + 12, 12, 7, 0, 0, Math.PI * 2);
        ctx.ellipse(ct.x + 10, ct.y + 7, 8, 5, 0, 0, Math.PI * 2);
        ctx.ellipse(ct.x + 10, ct.y + 3, 4, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        [p1, p2].forEach(p => {
            if (p && checkCollision(p, { x: ct.x, y: ct.y, width: 20, height: 20 })) {
                p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.07);
                p.addStatus('shield', 'buff', 'assets/icon/buff/shield.png', 300, 20, 60);
                p.cucTrauShieldTimer = 300;
                effects.push(new Explosion(ct.x + 10, ct.y + 10, 40, '#8b4513'));
                effects.push(new DamageText(p.x, p.y - 20, "+7%", '#8b4513'));
                phuHieuState.cucTrauList.splice(i, 1);
            }
        });
    }

    // QUẢ CẦU PHÙ HIỆU RƠI
    for (let i = phuHieuState.items.length - 1; i >= 0; i--) {
        let item = phuHieuState.items[i];
        item.floatOffset += 0.05;
        let drawY = item.y + Math.sin(item.floatOffset) * 5;

        ctx.save();
        ctx.fillStyle = '#ffd700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ffff00';
        ctx.beginPath();
        ctx.arc(item.x + 12, drawY + 12, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#000';
        ctx.font = 'bold 12px Arial';
        ctx.fillText('🔮', item.x + 4, drawY + 16);
        ctx.restore();

        [p1, p2].forEach(p => {
            if (p && !p.runes[3] && checkCollision(p, { x: item.x, y: drawY, width: item.w, height: item.h })) {
                generateRuneChoices(p);
                phuHieuState.items.splice(i, 1);
            }
        });
    }

    for (let i = phuHieuState.projectiles.length - 1; i >= 0; i--) {
        let proj = phuHieuState.projectiles[i];
        proj.update();
        proj.draw();
        if (!proj.active) phuHieuState.projectiles.splice(i, 1);
    }

    for (let i = phuHieuState.vfx.length - 1; i >= 0; i--) {
        let v = phuHieuState.vfx[i];
        v.update();
        v.draw();
        if (!v.active) phuHieuState.vfx.splice(i, 1);
    }

    [p1, p2].forEach(p => {
        if (!p || p.isDead) return;

        if (p.runes[0] && p.runes[0].id === 'vongtronmaphap') {
            p.vongTronMaPhapTimer = (p.vongTronMaPhapTimer || 0) + 1;
            if (p.vongTronMaPhapTimer >= 300) {
                p.vongTronMaPhapTimer = 0;
                let enemy = (p === p1) ? p2 : p1;
                if (enemy && !enemy.isDead) {
                    projectiles.push(new EverettMagicCircle(enemy.x + enemy.width / 2, canvas.height - groundHeight, 'vertical', 45, p));
                }
            }
        }

        let hasCucTrau = (p.runes[1] && p.runes[1].id === 'ancuctrau') || (p.runes[2] && p.runes[2].id === 'ancuctrau');
        if (hasCucTrau) {
            p.cucTrauSpawnTimer = (p.cucTrauSpawnTimer || 0) + 1;
            if (p.cucTrauSpawnTimer >= 300) {
                p.cucTrauSpawnTimer = 0;
                let sx = 80 + Math.random() * (canvas.width - 160);
                let sy = canvas.height - groundHeight - 20;
                phuHieuState.cucTrauList.push({ x: sx, y: sy, timer: 600 });
            }
        }

        let hasSkibidi = (p.runes[1] && p.runes[1].id === 'skibidi') || (p.runes[2] && p.runes[2].id === 'skibidi');
        if (hasSkibidi && !p.skibidiPet) {
            p.skibidiPet = new SkibidiToiletPet(p);
            phuHieuState.vfx.push(p.skibidiPet);
        }

        if (p.runes[0] && p.runes[0].id === 'cotex') {
            p.cotexTimer = (p.cotexTimer || 0) + 1;
            if (p.cotexTimer >= 120) {
                p.cotexTimer = 0;
                p.hp = Math.min(p.maxHp, p.hp + p.maxHp * 0.02);
                spawnCotexAura(p);
            }
        }

        if (p.runes[3] && p.runes[3].id === 'tinhthanyeuot') {
            p.tinhThanTimer = (p.tinhThanTimer || 0) + 1;
            if (p.tinhThanTimer >= 120) {
                p.tinhThanTimer = 0;
                p.tinhThanStacks = (p.tinhThanStacks || 0) + 1;
                spawnUpwardGoldLines(p);
            }
        }

        if (p.runes[0] && p.runes[0].id === 'phevocong') {
            p1.cds.c1 = 3600; p1.cds.c2 = 3600; p1.cds.c3 = 3600;
            p2.cds.c1 = 3600; p2.cds.c2 = 3600; p2.cds.c3 = 3600;
            if (p.cds.basic > 0) p.cds.basic = Math.max(0, p.cds.basic - 1);
            spawnPheVoCongVFX(p);
        }

        if (p.runes[3] && p.runes[3].id === 'dungcantao') {
            if (!p.hasStatus('ironbody')) {
                p.addStatus('ironbody', 'buff', 'assets/icon/buff/ironbody.png', 'inf', 0, 60);
            }
        }

        if (p.runes[0] && p.runes[0].id === 'nuocrut') {
            if (!p.nuocRutApplied) {
                p.baseSpeed *= 1.5;
                p.nuocRutApplied = true;
            }
            if (Math.abs(p.vx) > 0.5 || Math.abs(p.vy) > 0.5) {
                spawnNuocRutElectricTrail(p);
            }
        }

        if (p.runes[3] && p.runes[3].id === 'sieutoc' && p.sieuTocStacks > 0) {
            spawnSieuTocWindLines(p, p.sieuTocStacks);
        }
    });

    drawPhuHieuUI(ctx, p1, p2);
}

// --- TẠO LỰA CHỌN PHÙ HIỆU KHI NHẶT QUẢ CẦU ---
function generateRuneChoices(player) {
    let currentTier = 0;
    let targetSlot = 0;

    if (!player.runes[0]) {
        currentTier = 0; targetSlot = 0;
    } else if (!player.runes[1]) {
        currentTier = 1; targetSlot = 1;
    } else if (!player.runes[2]) {
        currentTier = 1; targetSlot = 2;
    } else if (!player.runes[3]) {
        currentTier = 2; targetSlot = 3;
    } else {
        return;
    }

    let pool = RUNES_BASIC;
    if (currentTier === 0) pool = RUNES_BASIC;
    else if (currentTier === 1) pool = RUNES_INTERMEDIATE;
    else if (currentTier === 2) pool = RUNES_ADVANCED.filter(r => r.id !== 'phevat');

    if (!player.lastRuneChoices) player.lastRuneChoices = [];

    let poolFiltered = pool.filter(r =>
        !player.runes.some(equipped => equipped && equipped.id === r.id) &&
        !player.lastRuneChoices.includes(r.id)
    );

    if (poolFiltered.length < 3) {
        poolFiltered = pool.filter(r => !player.runes.some(equipped => equipped && equipped.id === r.id));
    }

    let shuffled = [...poolFiltered].sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 3);
    
    player.lastRuneChoices = selected.map(r => r.id);
    player.pendingChoices = selected.map(r => ({ ...r, targetSlot }));
}

function selectRuneChoice(player, index) {
    if (!player || !player.pendingChoices || !player.pendingChoices[index]) return;

    let rune = player.pendingChoices[index];
    let slot = rune.targetSlot;

    // ĐẢO NGƯỢC THỜI GIAN
    if (rune.id === 'daonguocthoigian') {
        player.pendingChoices = null;

        [player1, player2].forEach(p => {
            if (p) {
                p.totems = Math.min(7, p.totems + 3);
                p.runes = [null, null, null, null];
                p.daotanBonus = 50;
                p.tinhThanStacks = 0;
                p.sieuTocStacks = 0;
                p.caocaoCharged = false;
                p.tangHinhTimer = 0;
                p.isThePhachTitan = false;
                p.shadowRunePos = null;
                p.hasBongMaRune = false;
                p.chamMaChacTimer = 0;
                p.chamMaChacReady = false;
                p.maPhapLienHoiTimer = 0;
                p.isMaPhapActive = false;
                p.a00Timer = 0;
                p.a00Num1 = null;
                p.a00Op = null;
                p.a00Num2 = null;
                p.a00Result = null;
                p.banChanLoXoBonus = 0;
                p.denPinTimer = 0;
                p.width = 30; p.height = 50;
                if (p.isTungTung) {
                    p.isTungTung = false;
                    p.hp = p.tungTungSavedHp || p.maxHp;
                }
            }
        });

        phuHieuState.spawnTimer = 0;
        effects.push(new Explosion(canvas.width / 2, canvas.height / 2, 400, '#00ffff'));
        return;
    }

    // HOÁN ĐỔI TƯỚNG GIỮA 2 NGƯỜI CHƠI
    if (rune.id === 'hoandoi') {
        player.pendingChoices = null;
        if (player1 && player2) {
            let tempHero = player1.heroType;
            player1.heroType = player2.heroType;
            player2.heroType = tempHero;

            effects.push(new Explosion(player1.x + player1.width / 2, player1.y + player1.height / 2, 80, '#ff00ff'));
            effects.push(new Explosion(player2.x + player2.width / 2, player2.y + player2.height / 2, 80, '#ff00ff'));
        }
        return;
    }

    player.runes[slot] = rune;
    player.pendingChoices = null;

    if (rune.id === 'doicanhtudo') {
        player.maxJumps = (player.maxJumps || 2) + 1;
    }

    if (rune.id === 'thephachtitan') {
        player.isThePhachTitan = true;
        player.width *= 7;
        player.height *= 7;
        player.y -= (50 * 6);
        effects.push(new Explosion(player.x + player.width / 2, player.y + player.height / 2, 200, '#8b4513'));
    }

    if (rune.id === 'bongma') {
        player.shadowRunePos = { x: player.x, y: player.y };
        player.hasBongMaRune = true;
    }

    if (rune.id === 'songdaithanhhuyenthoai') {
        player.songDaiSnapTotems = player.totems;
    }

    if (rune.id === 'tungtungsahur') {
        player.tungTungSavedHp = player.hp;
        player.isTungTung = true;
        player.tungTungLives = 2;
        player.maxCds = { basic: 60, c1: 300, c2: 462, c3: 660, dash: player.cds.dash };
        player.cds.basic = 0; player.cds.c1 = 0; player.cds.c2 = 0; player.cds.c3 = 0;
        
        effects.push(new Explosion(player.x + player.width / 2, player.y + player.height / 2, 120, '#ffd700'));
    }

    let tierColor = rune.tier === 0 ? '#00ff00' : (rune.tier === 1 ? '#00ffff' : '#ff00ff');
    effects.push(new OvalShockwave(player.x + player.width / 2, player.y + player.height / 2, true, tierColor, 0));
    effects.push(new Explosion(player.x + player.width / 2, player.y + player.height / 2, 70, tierColor));

    if (rune.id === 'thanhquyet') {
        ['c1', 'c2', 'c3'].forEach(k => {
            if (player.maxCds && player.maxCds[k]) player.maxCds[k] *= 0.8;
        });
    }

    if (rune.id === 'khoathe') {
        let enemy = (player === player1) ? player2 : player1;
        let pheVatRune = RUNES_ADVANCED.find(r => r.id === 'phevat');
        enemy.runes[3] = pheVatRune;
        effects.push(new Explosion(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, 90, '#8a2be2'));
    }
}

// --- TRINH SÁT ĐOÀN LEVI SPIN ---
class TrinhSatDoanSpin {
    constructor(owner, target) {
        this.owner = owner;
        this.target = target;
        this.timer = 32;
        this.active = true;
        this.hitCount = 0;
        effects.push(new LeviC2Animation(owner));
    }
    update() {
        this.timer--;
        let elapsed = 32 - this.timer;
        if (elapsed >= 6 && this.hitCount < 5 && (elapsed - 6) % 5 === 0) {
            if (this.target && !this.target.isDead) {
                let dist = Math.hypot((this.target.x + 15) - (this.owner.x + this.owner.width / 2), (this.target.y + 25) - (this.owner.y + this.owner.height / 2));
                if (dist <= 250) {
                    this.target.takeDamage(15, 'trinhsatdoan');
                    effects.push(new Explosion(this.target.x + 15, this.target.y + 25, 40, 'rgba(255,255,255,0.6)'));
                }
            }
            this.hitCount++;
        }
        if (this.timer <= 0) this.active = false;
    }
    draw() {}
}

// --- LÀN SÓNG ĂN TO NÓI LỚN ---
class AnToNoiLonWave {
    constructor(owner) {
        this.owner = owner;
        this.x = owner.x + owner.width / 2;
        this.y = owner.y + owner.height / 2;
        this.radius = 10;
        this.maxRadius = 500;
        this.speed = 12;
        this.active = true;
        this.hasHit = false;
    }

    update() {
        this.radius += this.speed;
        let enemy = (this.owner === player1) ? player2 : player1;

        if (!this.hasHit && enemy && !enemy.isDead) {
            let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
            if (dist <= this.radius) {
                this.hasHit = true;
                if (dist <= 250) {
                    enemy.takeDamage(2 + Math.random() * 2, 'antonoidon');
                } else {
                    enemy.takeDamage(1, 'antonoidon');
                }
                phuHieuState.vfx.push(new MiniSonicWaveHit(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2));
            }
        }

        if (this.radius >= this.maxRadius) this.active = false;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        let alpha = 1 - (this.radius / this.maxRadius);
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.8})`;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

// --- HIỆU ỨNG SÓNG ÂM MINI KHI TRÚNG ĐỊCH ---
class MiniSonicWaveHit {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 45;
        this.speed = 3;
        this.active = true;
    }

    update() {
        this.radius += this.speed;
        if (this.radius >= this.maxRadius) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        let progress = this.radius / this.maxRadius;
        let alpha = 1 - progress;
        ctx.strokeStyle = `rgba(0, 255, 255, ${alpha * 0.9})`;
        ctx.lineWidth = 2.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

// --- HỆ ĐIỀU HÀNH WINDOWS TELEPORT ---
function teleportBothToValidGround(p1, p2) {
    let validSpots = [];
    validSpots.push({ x: 50 + Math.random() * (canvas.width - 100), y: canvas.height - groundHeight - p1.height });
    
    if (platforms && platforms.length > 0) {
        platforms.forEach(plat => {
            validSpots.push({ x: plat.x + Math.random() * Math.max(10, plat.w - 30), y: plat.y - p1.height });
        });
    }

    let spot1 = validSpots[Math.floor(Math.random() * validSpots.length)];
    let spot2 = validSpots[Math.floor(Math.random() * validSpots.length)];

    effects.push(new Explosion(p1.x + p1.width / 2, p1.y + p1.height / 2, 60, '#00bfff'));
    effects.push(new Explosion(p2.x + p2.width / 2, p2.y + p2.height / 2, 60, '#00bfff'));

    p1.x = spot1.x; p1.y = spot1.y; p1.vx = 0; p1.vy = 0;
    p2.x = spot2.x; p2.y = spot2.y; p2.vx = 0; p2.vy = 0;

    effects.push(new OvalShockwave(p1.x + p1.width / 2, p1.y + p1.height / 2, true, '#00ffff', 0));
    effects.push(new OvalShockwave(p2.x + p2.width / 2, p2.y + p2.height / 2, true, '#00ffff', 0));
}

// --- BOOMBADINO CROCODINO PLANE ---
class BoombadinoCrocodinoPlane extends Projectile {
    constructor(y, facingRight, owner) {
        let startX = facingRight ? -200 : canvas.width + 200;
        let vx = facingRight ? 10 : -10;
        super(startX, y, vx, 0, 150, 40, 'rgba(0,0,0,0)', owner, 0, true);
        this.facingRight = facingRight;
        this.bombsDropped = 0;
        this.timer = 0;
        
        playSkillSound('assets/sounds/sound_skill/trump/c1_plane.ogg');
    }
    update() {
        this.x += this.vx;
        this.timer++;
        
        if (this.timer % 12 === 0 && this.bombsDropped < 10) {
            projectiles.push(new BoombadinoCrocodinoBomb(this.x + 75, this.y + 20, this.owner));
            this.bombsDropped++;
        }
        if (this.x > canvas.width + 300 || this.x < -300) this.active = false;
        
        if (this.timer % 5 === 0) {
            canvas.style.transform = `translate(0px, ${Math.random()*4 - 2}px)`;
            setTimeout(() => canvas.style.transform = 'none', 30);
        }
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x + 75, this.y + 20);
        let flip = this.facingRight ? 1 : -1;
        ctx.scale(flip, 1);

        ctx.fillStyle = '#2e8b57';
        ctx.beginPath();
        ctx.ellipse(0, 0, 75, 18, 0, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#228b22';
        ctx.fillRect(35, -9, 35, 18);
        ctx.fillStyle = '#ffffff';
        for (let i = 0; i < 5; i++) {
            ctx.fillRect(40 + i * 6, -10, 3, 4);
            ctx.fillRect(40 + i * 6, 6, 3, 4);
        }

        ctx.fillStyle = '#ffff00';
        ctx.beginPath(); ctx.arc(25, -12, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000';
        ctx.fillRect(25, -13, 3, 6);

        ctx.fillStyle = '#556b2f';
        ctx.fillRect(-20, -28, 35, 10);
        ctx.fillRect(-20, 18, 35, 10);

        ctx.fillStyle = '#ffd700';
        ctx.fillRect(-78, -12 + Math.sin(Date.now() / 20) * 10, 6, 24);

        ctx.restore();
    }
}

// Bom nổ thả từ Boombadino Crocodino Plane
class BoombadinoCrocodinoBomb extends Projectile {
    constructor(x, y, owner) {
        super(x, y, 0, 6, 10, 30, '#333', owner, 25, true);
        this.exploded = false;
    }
    update() {
        if (this.exploded) return;
        this.y += this.vy;
        if (this.y >= canvas.height - groundHeight - this.height) {
            this.explode();
        }
    }
    explode() {
        this.exploded = true;
        this.active = false;
        
        playSkillSound('assets/sounds/sound_skill/trump/c1_hit.ogg');

        effects.push(new Explosion(this.x + 5, this.y + 30, 170, 'rgba(46, 139, 87, 0.85)'));
        let enemy = this.owner === player1 ? player2 : player1;
        if (Math.hypot(enemy.x + enemy.width/2 - this.x, enemy.y + enemy.height/2 - this.y) <= 170) {
            enemy.takeDamage(this.damage);
        }
        canvas.style.transform = `translate(${Math.random()*10 - 5}px, ${Math.random()*10 - 5}px)`;
        setTimeout(() => canvas.style.transform = 'none', 50);
    }
    applyEffect(target) {
        this.explode();
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = '#228b22';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.height);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x + this.width/2, this.y + this.height + 10);
        ctx.fill();
        
        ctx.fillStyle = (Math.random() > 0.5) ? '#ffd700' : '#32cd32';
        ctx.beginPath();
        ctx.moveTo(this.x + 2, this.y);
        ctx.lineTo(this.x + 8, this.y);
        ctx.lineTo(this.x + 5, this.y - 15 - Math.random() * 5);
        ctx.fill();
        ctx.restore();
    }
}

// --- TUNG TUNG SPACE RIFT ---
class TungTungSpaceRift {
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.timer = 30;
        this.active = true;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
            let enemy = (this.owner === player1) ? player2 : player1;
            let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);

            if (dist <= 200 && !enemy.isDead) {
                enemy.takeDamage(30);
                enemy.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 20, 0, 60);
            }

            effects.push(new Explosion(this.x, this.y, 200, 'rgba(138, 43, 226, 0.7)'));
            effects.push(new OvalShockwave(this.x, this.y, true, '#00ffff', 0));
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        let progress = 1 - (this.timer / 30);

        ctx.strokeStyle = `rgba(0, 255, 255, ${progress * 0.8})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([8, 8]);
        ctx.beginPath();
        ctx.arc(0, 0, 200, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = '#ff00ff';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-15 * progress, -25 * progress);
        ctx.lineTo(5 * progress, -5 * progress);
        ctx.lineTo(-10 * progress, 15 * progress);
        ctx.lineTo(20 * progress, 30 * progress);
        ctx.stroke();

        ctx.restore();
    }
}

// --- TUNG TUNG SPACE CRACK ---
class TungTungSpaceCrack {
    constructor(x, y, facingRight, coneAngle, reach, color, isHeavy = false) {
        this.x = x;
        this.y = y;
        this.facingRight = facingRight;
        this.coneAngle = coneAngle;
        this.reach = reach;
        this.color = color;
        this.isHeavy = isHeavy;
        this.timer = 18;
        this.maxTimer = 18;
        this.active = true;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        let alpha = this.timer / this.maxTimer;
        let baseAngle = this.facingRight ? 0 : Math.PI;

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.isHeavy ? 4 : 2.5;
        ctx.shadowBlur = this.isHeavy ? 18 : 8;
        ctx.shadowColor = this.color;
        ctx.globalAlpha = alpha;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.reach, baseAngle - this.coneAngle, baseAngle + this.coneAngle);
        ctx.stroke();

        let numCracks = this.isHeavy ? 9 : 4;
        for (let i = 0; i < numCracks; i++) {
            let a = baseAngle - this.coneAngle + (i / (numCracks - 1 || 1)) * (this.coneAngle * 2);
            let len = this.reach * (0.7 + Math.random() * 0.3);
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            let midX = this.x + Math.cos(a) * (len * 0.5) + (Math.random() - 0.5) * 30;
            let midY = this.y + Math.sin(a) * (len * 0.5) + (Math.random() - 0.5) * 30;
            let endX = this.x + Math.cos(a) * len;
            let endY = this.y + Math.sin(a) * len;
            ctx.lineTo(midX, midY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        }

        ctx.restore();
    }
}

// --- CLASS SKIBIDI TOILET PET ---
class SkibidiToiletPet {
    constructor(owner) {
        this.owner = owner;
        this.x = owner.x;
        this.y = owner.y - 80;
        this.angle = Math.random() * Math.PI * 2;
        this.targetAngle = this.angle;
        this.speed = 2.5;
        this.turnTimer = 0;
        this.laserTimer = 0;
        this.active = true;
    }

    update() {
        if (!this.owner || this.owner.isDead) return;
        let enemy = (this.owner === player1) ? player2 : player1;

        this.turnTimer++;
        if (this.turnTimer >= 60) {
            this.turnTimer = 0;
            this.targetAngle = this.angle + (Math.random() - 0.5) * (Math.PI * 2 / 3);
        }

        let maxTurnRate = (20 * Math.PI / 180) / 60;
        let diff = this.targetAngle - this.angle;
        this.angle += Math.max(-maxTurnRate, Math.min(maxTurnRate, diff));

        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        if (this.x < 50) { this.x = 50; this.angle = 0; }
        if (this.x > canvas.width - 50) { this.x = canvas.width - 50; this.angle = Math.PI; }
        if (this.y < 50) { this.y = 50; this.angle = Math.PI / 2; }
        if (this.y > canvas.height - groundHeight - 100) { this.y = canvas.height - groundHeight - 100; this.angle = -Math.PI / 2; }

        let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
        if (dist <= 500 && !enemy.isDead) {
            this.laserTimer++;
            if (this.laserTimer >= 12) {
                this.laserTimer = 0;
                enemy.takeDamage(2, 'skibidi_laser');
            }
        } else {
            this.laserTimer = 0;
        }
    }

    draw() {
        if (!this.owner || this.owner.isDead) return;
        let enemy = (this.owner === player1) ? player2 : player1;
        let pColor = (this.owner === player1) ? '#ff0055' : '#00bfff';

        ctx.save();

        ctx.fillStyle = pColor;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.ellipse(this.x, canvas.height - groundHeight, 20, 6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;

        let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
        if (dist <= 500 && !enemy.isDead) {
            ctx.strokeStyle = pColor;
            ctx.lineWidth = 3;
            ctx.shadowBlur = 10;
            ctx.shadowColor = pColor;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2);
            ctx.stroke();
            ctx.shadowBlur = 0;
        }

        ctx.translate(this.x, this.y);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(-12, -10, 24, 20);
        ctx.fillRect(-15, -18, 30, 8);
        ctx.fillStyle = '#dddddd';
        ctx.fillRect(-8, 10, 16, 8);

        ctx.fillStyle = '#ffcc99';
        ctx.beginPath(); ctx.arc(0, -22, 9, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#000000';
        ctx.fillRect(-8, -31, 16, 5);

        ctx.restore();
    }
}

// --- GOJO FULL ULT ANIMATION FX ---
class GojoFullUltFX {
    constructor(owner, target) {
        this.owner = owner;
        this.target = target;
        this.timer = 100;
        this.active = true;
        playSkillSound('assets/sounds/sound_skill/gojo/c3_cast.ogg');
    }

    update() {
        this.timer--;
        if (this.timer === 20) {
            playSkillSound('assets/sounds/sound_skill/gojo/c3_use.ogg');
            let pX = this.owner.facingRight ? this.owner.x + 40 : this.owner.x - 300;
            projectiles.push(new GojoPurpleSphere(pX, this.owner.y, this.owner.facingRight, this.owner));
        }
        if (this.timer <= 0) this.active = false;
    }

    draw() {
        if (!this.active || !this.owner) return;
        let progress = 1 - (this.timer / 100);

        ctx.save();
        ctx.fillStyle = `rgba(138, 43, 226, ${progress * 0.4})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        let frameIndex = Math.min(24, Math.floor(progress * 25));
        let imgSrc = `assets/skill_effect/gojo/purplehollow_${frameIndex}.png`;

        if (typeof loadedImages !== 'undefined' && loadedImages[imgSrc]) {
            let img = loadedImages[imgSrc];
            let scale = 0.85;
            let drawW = 1024 * scale;
            let drawH = 576 * scale;
            let drawX = this.owner.facingRight ? 0 : (canvas.width - drawW);
            let drawY = 80;

            if (this.owner.facingRight) {
                ctx.translate(drawX + drawW, drawY);
                ctx.scale(-1, 1);
                ctx.drawImage(img, 0, 0, drawW, drawH);
            } else {
                ctx.drawImage(img, drawX, drawY, drawW, drawH);
            }
        }
        ctx.restore();
    }
}

// --- LIÊN BẠO KÍCH BULLET ---
class LienBaoKichBullet {
    constructor(x, y, vx, vy, target, damage) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.target = target;
        this.damage = damage;
        this.active = true;
        this.life = 60;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;

        if (this.target && checkCollision({ x: this.x - 5, y: this.y - 5, width: 10, height: 10 }, this.target)) {
            this.target.takeDamage(this.damage, 'lienbaokich');
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 15, '#ff00ff'));
            return;
        }

        if (this.life <= 0 || this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        let angle = Math.atan2(this.vy, this.vx);
        ctx.rotate(angle);

        ctx.fillStyle = '#ff00ff';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff00ff';
        
        ctx.beginPath();
        ctx.moveTo(10, 0);
        ctx.lineTo(-6, -6);
        ctx.lineTo(-2, 0);
        ctx.lineTo(-6, 6);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }
}

// --- PHÁN QUYẾT ARROW ---
class PhanQuyetArrow {
    constructor(x, y, target, owner, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.owner = owner;
        this.damage = damage || 50;
        this.speed = 35;
        this.active = true;
    }
    update() {
        if (!this.target) { this.active = false; return; }
        let dx = (this.target.x + this.target.width / 2) - this.x;
        let dy = (this.target.y + this.target.height / 2) - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 20) {
            this.target.takeDamage(this.damage, 'phanquyet');
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 80, '#ffffff'));
            return;
        }
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;
    }
    draw() {
        ctx.save();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 5;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#ffffff';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x - 10, this.y - 35);
        ctx.stroke();
        ctx.restore();
    }
}

// --- SẤM RỀN THUNDER ---
class SamRenThunder {
    constructor(x, y, target, owner) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.owner = owner;
        this.timer = 10;
        this.active = true;

        if (target) {
            let dmg = target.hp * 0.07;
            target.takeDamage(dmg, 'samren');
            target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 30, 0, 60);
        }
    }
    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }
    draw() {
        ctx.save();
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#00ffff';
        ctx.beginPath();
        ctx.moveTo(this.x, 0);
        ctx.lineTo(this.x + (Math.random() - 0.5) * 20, this.y / 2);
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.restore();
    }
}

// --- KIM JONG UN BOMB ---
class KimJongUnBomb {
    constructor(x, y, owner) {
        this.x = x;
        this.y = y;
        this.owner = owner;
        this.vy = 18;
        this.active = true;
        this.passPlatform = Math.random() < 0.65;
    }
    update() {
        this.y += this.vy;
        let enemy = (this.owner === player1) ? player2 : player1;

        if (checkCollision({ x: this.x, y: this.y, width: 20, height: 20 }, enemy)) {
            enemy.takeDamage(30, 'kimjongun');
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 60, '#ff4500'));
            return;
        }

        if (!this.passPlatform && platforms) {
            for (let plat of platforms) {
                if (this.y >= plat.y && this.y <= plat.y + plat.h && this.x >= plat.x && this.x <= plat.x + plat.w) {
                    this.active = false;
                    effects.push(new Explosion(this.x, this.y, 50, '#ff4500'));
                    return;
                }
            }
        }

        if (this.y >= canvas.height - groundHeight) {
            this.active = false;
            effects.push(new Explosion(this.x, canvas.height - groundHeight, 60, '#ff4500'));
        }
    }
    draw() {
        ctx.save();
        ctx.fillStyle = '#ff3300';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// --- RUNE BULLET ---
function spawnRuneBulletAround(attacker, target, colorType, damage) {
    let angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI * 0.8);
    let dist = 60 + Math.random() * 40;
    let spawnX = attacker.x + attacker.width / 2 + Math.cos(angle) * dist;
    let spawnY = attacker.y + attacker.height / 2 + Math.sin(angle) * dist;
    phuHieuState.projectiles.push(new RuneBullet(spawnX, spawnY, target, colorType, damage));
}

class RuneBullet {
    constructor(x, y, target, colorType, damage) {
        this.x = x;
        this.y = y;
        this.target = target;
        this.colorType = colorType;
        this.damage = damage;
        this.speed = 3;
        this.active = true;
    }
    update() {
        if (!this.target || this.target.isDead) { this.active = false; return; }
        this.speed += 0.6;
        let dx = (this.target.x + this.target.width / 2) - this.x;
        let dy = (this.target.y + this.target.height / 2) - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 15) {
            this.target.takeDamage(this.damage, 'rune_bullet');
            this.active = false;
            effects.push(new Explosion(this.x, this.y, 25, this.colorType === 'yellow' ? '#ffff00' : '#a020f0'));
            return;
        }
        this.x += (dx / dist) * this.speed;
        this.y += (dy / dist) * this.speed;

        if (Math.random() < 0.6) {
            effects.push(new RockParticle(this.x, this.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, this.colorType === 'yellow' ? '#ffff00' : '#8a2be2'));
        }
    }
    draw() {
        ctx.save();
        ctx.fillStyle = this.colorType === 'yellow' ? '#ffff00' : '#a020f0';
        ctx.shadowBlur = 12;
        ctx.shadowColor = ctx.fillStyle;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.colorType === 'yellow' ? 6 : 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

function spawnPhanDonReflect(self, enemy, dmg) {
    let dir = self.x < enemy.x ? 1 : -1;
    projectiles.push(new Projectile(
        self.x + self.width / 2, self.y + 15,
        dir * 20, 0,
        25, 8, '#00ffff', self, Math.min(dmg, 30), true
    ));
}

class HexagonShieldFX {
    constructor(target) {
        this.target = target;
        this.timer = 40;
        this.active = true;
    }
    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }
    draw() {
        if (!this.active || !this.target) return;
        ctx.save();
        ctx.translate(this.target.x + this.target.width / 2, this.target.y + this.target.height / 2);
        ctx.strokeStyle = '#00ffff';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#00ffff';
        ctx.globalAlpha = this.timer / 40;

        ctx.beginPath();
        let r = 40;
        for (let i = 0; i < 6; i++) {
            let a = (Math.PI / 3) * i;
            let x = r * Math.cos(a);
            let y = r * Math.sin(a);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
    }
}

function spawnCotexAura(player) {
    for (let i = 0; i < 6; i++) {
        let color = Math.random() < 0.5 ? '#ff0033' : '#220000';
        effects.push(new RockParticle(
            player.x + Math.random() * player.width,
            player.y + Math.random() * player.height,
            (Math.random() - 0.5) * 3,
            -Math.random() * 3,
            color
        ));
    }
}

function spawnPheVoCongVFX(player) {
    if (Math.random() < 0.4) {
        let color = Math.random() < 0.5 ? '#ff0033' : '#ffffff';
        let x = player.x + Math.random() * player.width;
        let y = player.y + player.height;
        effects.push(new VerticalLineParticle(x, y, color));
    }
}

class VerticalLineParticle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.vy = -2 - Math.random() * 2;
        this.life = 25;
        this.maxLife = 25;
        this.active = true;
    }
    update() {
        this.y += this.vy;
        this.life--;
        if (this.life <= 0) this.active = false;
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y - 12);
        ctx.stroke();
        ctx.restore();
    }
}

function spawnUpwardGoldLines(player) {
    for (let i = 0; i < 5; i++) {
        let x = player.x + Math.random() * player.width;
        let y = player.y + player.height;
        effects.push(new VerticalLineParticle(x, y, '#ffd700'));
    }
}

function spawnSieuTocWindLines(player, stacks) {
    let tier = Math.floor(stacks / 25) + 1;
    if (Math.abs(player.vx) > 0.5 || Math.abs(player.vy) > 0.5) {
        for (let i = 0; i < tier; i++) {
            if (Math.random() < 0.5) {
                let x = player.x + Math.random() * player.width;
                let y = player.y + Math.random() * player.height;
                effects.push(new WindLineParticle(x, y, -player.vx * 0.5, (Math.random() - 0.5) * 2, tier));
            }
        }
    }
}

class WindLineParticle {
    constructor(x, y, vx, vy, tier) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.tier = tier;
        this.life = 12 + tier * 2;
        this.maxLife = this.life;
        this.active = true;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        if (this.life <= 0) this.active = false;
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 1 + this.tier * 0.5;
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.vx * 3, this.y + this.vy * 3);
        ctx.stroke();
        ctx.restore();
    }
}

// --- UI HIỂN THỊ PHÙ HIỆU & LỰA CHỌN ---
function drawPhuHieuUI(ctx, p1, p2) {
    let iconSize = 36;
    let yPos = canvas.height - groundHeight + 6;

    if (p1) {
        let startX = 15;
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(`🗿 TOTEM: ${p1.totems}/7 [V: Menu]`, startX, yPos - 6);

        let hasMicP1 = (p1.runes[1] && p1.runes[1].id === 'antonoidon') || (p1.runes[2] && p1.runes[2].id === 'antonoidon');
        if (hasMicP1) {
            let micVal = p1.currentMicVol || 0;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(startX + 140, yPos - 15, 60, 8);
            ctx.fillStyle = micVal > 20 ? '#00ff00' : '#ff0000';
            ctx.fillRect(startX + 140, yPos - 15, Math.min(60, (micVal / 60) * 60), 8);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(startX + 140, yPos - 15, 60, 8);
        }

        for (let i = 0; i < 4; i++) {
            let sx = startX + 3 * (32 + 10) + 15 + i * (iconSize + 5);
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(sx, yPos, iconSize, iconSize);
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(sx, yPos, iconSize, iconSize);

            if (p1.runes[i]) {
                let img = getRuneImage(p1.runes[i].id);
                if (img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(img, sx, yPos, iconSize, iconSize);
                } else {
                    ctx.fillStyle = '#00ffff';
                    ctx.font = 'bold 9px Arial';
                    ctx.fillText(p1.runes[i].name, sx + 2, yPos + 20);
                }
            } else {
                ctx.fillStyle = '#666';
                ctx.font = '9px Arial';
                ctx.fillText(['Sơ', 'Trung 1', 'Trung 2', 'Cao'][i], sx + 2, yPos + 20);
            }
        }
    }

    if (p2) {
        let startX = canvas.width - (32 * 3 + 20) - 20;
        ctx.fillStyle = '#00ff00';
        ctx.font = 'bold 11px Arial';
        ctx.fillText(`🗿 TOTEM: ${p2.totems}/7 [B: Menu]`, startX - 110, yPos - 6);

        let hasMicP2 = (p2.runes[1] && p2.runes[1].id === 'antonoidon') || (p2.runes[2] && p2.runes[2].id === 'antonoidon');
        if (hasMicP2) {
            let micVal = p2.currentMicVol || 0;
            ctx.fillStyle = 'rgba(0,0,0,0.5)';
            ctx.fillRect(startX - 200, yPos - 15, 60, 8);
            ctx.fillStyle = micVal > 20 ? '#00ff00' : '#ff0000';
            ctx.fillRect(startX - 200, yPos - 15, Math.min(60, (micVal / 60) * 60), 8);
            ctx.strokeStyle = '#ffffff';
            ctx.strokeRect(startX - 200, yPos - 15, 60, 8);
        }

        for (let i = 0; i < 4; i++) {
            let sx = startX - (4 - i) * (iconSize + 5) - 10;
            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            ctx.fillRect(sx, yPos, iconSize, iconSize);
            ctx.strokeStyle = '#ffd700';
            ctx.lineWidth = 1.5;
            ctx.strokeRect(sx, yPos, iconSize, iconSize);

            if (p2.runes[i]) {
                let img = getRuneImage(p2.runes[i].id);
                if (img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(img, sx, yPos, iconSize, iconSize);
                } else {
                    ctx.fillStyle = '#00ffff';
                    ctx.font = 'bold 9px Arial';
                    ctx.fillText(p2.runes[i].name, sx + 2, yPos + 20);
                }
            } else {
                ctx.fillStyle = '#666';
                ctx.font = '9px Arial';
                ctx.fillText(['Sơ', 'Trung 1', 'Trung 2', 'Cao'][i], sx + 2, yPos + 20);
            }
        }
    }

    const renderCardChoices = (player, keys, isP1) => {
        if (!player || !player.pendingChoices) return;

        let cardW = 210;
        let cardH = 110;
        let totalW = cardW * 3 + 20;
        let baseX = isP1 ? 20 : canvas.width - totalW - 20;
        let baseY = 80;

        for (let i = 0; i < 3; i++) {
            let rune = player.pendingChoices[i];
            let cx = baseX + i * (cardW + 10);

            ctx.save();
            let img = getRuneImage(rune.id);
            if (img.complete && img.naturalWidth > 0) {
                ctx.drawImage(img, cx, baseY, cardW, cardH);
                ctx.fillStyle = 'rgba(0, 0, 0, 0.65)';
                ctx.fillRect(cx, baseY, cardW, cardH);
            } else {
                ctx.fillStyle = 'rgba(15, 15, 25, 0.95)';
                ctx.fillRect(cx, baseY, cardW, cardH);
            }

            ctx.strokeStyle = rune.tier === 0 ? '#00ff00' : (rune.tier === 1 ? '#00ffff' : '#ff00ff');
            ctx.lineWidth = 3;
            ctx.strokeRect(cx, baseY, cardW, cardH);

            ctx.fillStyle = '#ffd700';
            ctx.font = 'bold 15px Arial';
            ctx.fillText(`[${keys[i]}] ${rune.name}`, cx + 8, baseY + 22);

            ctx.strokeStyle = 'rgba(255, 215, 0, 0.4)';
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(cx + 8, baseY + 28); ctx.lineTo(cx + cardW - 8, baseY + 28); ctx.stroke();

            ctx.fillStyle = '#ffffff';
            ctx.font = '12px Arial';
            wrapText(ctx, rune.desc, cx + 8, baseY + 45, cardW - 16, 15);

            ctx.restore();
        }
    };

    renderCardChoices(p1, ['4', '5', '6'], true);
    renderCardChoices(p2, ['7', '8', '9'], false);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    if (!text) return;
    let words = text.split(' ');
    let line = '';
    for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
            ctx.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    ctx.fillText(line, x, y);
}

// --- THƯ VIỆN PHÙ HIỆU ---
function openRuneLibrary() {
    document.getElementById('selection-screen').style.display = 'none';
    document.getElementById('rune-library-screen').style.display = 'flex';
    renderRuneLibrary();
}

function closeRuneLibrary() {
    document.getElementById('rune-library-screen').style.display = 'none';
    document.getElementById('selection-screen').style.display = 'block';
}

function renderRuneLibrary() {
    const listRight = document.getElementById('rune-list-right');
    listRight.innerHTML = '';

    const categories = [
        { title: '🟢 PHÙ HIỆU SƠ CẤP', list: RUNES_BASIC, color: '#00ff00' },
        { title: '🔵 PHÙ HIỆU TRUNG CẤP', list: RUNES_INTERMEDIATE, color: '#00ffff' },
        { title: '🟣 PHÙ HIỆU CAO CẤP', list: RUNES_ADVANCED, color: '#ff00ff' }
    ];

    categories.forEach(cat => {
        let catHeader = document.createElement('div');
        catHeader.className = 'rune-cat-header';
        catHeader.style.color = cat.color;
        catHeader.innerText = cat.title;
        listRight.appendChild(catHeader);

        let catGrid = document.createElement('div');
        catGrid.className = 'rune-cat-grid';

        cat.list.forEach(rune => {
            let card = document.createElement('div');
            card.className = 'rune-lib-card';
            card.style.borderColor = cat.color;
            card.onclick = () => selectRuneDetail(rune);

            card.innerHTML = `
                <img src="assets/gameplay/${rune.id}.png" onerror="this.src='assets/gameplay/badge.png'" class="rune-card-img">
                <div class="rune-card-name">${rune.name}</div>
            `;
            catGrid.appendChild(card);
        });

        listRight.appendChild(catGrid);
    });

    selectRuneDetail(RUNES_BASIC[0]);
}

function selectRuneDetail(rune) {
    document.getElementById('rune-detail-img').src = `assets/gameplay/${rune.id}.png`;
    document.getElementById('rune-detail-name').innerText = rune.name;
    
    let tierText = ['SƠ CẤP', 'TRUNG CẤP', 'CAO CẤP'][rune.tier] || 'CAO CẤP';
    let tierColor = ['#00ff00', '#00ffff', '#ff00ff'][rune.tier] || '#ff00ff';
    
    let tierElem = document.getElementById('rune-detail-tier');
    tierElem.innerText = tierText;
    tierElem.style.color = tierColor;
    tierElem.style.borderColor = tierColor;

    document.getElementById('rune-detail-desc').innerText = rune.desc;
    document.getElementById('rune-detail-text').innerText = rune.text;
}

/* ===================================================
   HỆ THỐNG DEBUG PHÙ HIỆU: PHÍM V (P1) & PHÍM B (P2)
   =================================================== */

let activeDebugPlayerIndex = 1;

// Hàm hoàn tác hiệu ứng khi xóa phù hiệu
function revertRuneEffect(player, rune) {
    if (!rune || !player) return;

    if (rune.id === 'banchanloxo') {
        player.banChanLoXoBonus = 0;
    }
    if (rune.id === 'denpinthunho') {
        player.denPinTimer = 0;
        player.width = 30; player.height = 50;
    }
    if (rune.id === 'doicanhtudo') {
        player.maxJumps = Math.max(2, (player.maxJumps || 2) - 1);
    }
    if (rune.id === 'thephachtitan') {
        if (player.isThePhachTitan) {
            player.isThePhachTitan = false;
            player.width = 30;
            player.height = 50;
        }
    }
    if (rune.id === 'bongma') {
        player.shadowRunePos = null;
        player.hasBongMaRune = false;
    }
    if (rune.id === 'nuocrut') {
        if (player.nuocRutApplied) {
            player.baseSpeed /= 1.5;
            player.nuocRutApplied = false;
        }
    }
    if (rune.id === 'dungcantao') {
        player.removeStatus('ironbody');
    }
    if (rune.id === 'sieutoc') {
        player.sieuTocStacks = 0;
        player.baseSpeed = (player.heroType === 'greninja' ? 6.5 : 5.5);
    }
    if (rune.id === 'tinhthanyeuot') {
        player.tinhThanStacks = 0;
    }
    if (rune.id === 'skibidi') {
        if (player.skibidiPet) {
            player.skibidiPet.active = false;
            player.skibidiPet = null;
        }
    }
    if (rune.id === 'chammachac') {
        player.chamMaChacReady = false;
        player.chamMaChacTimer = 0;
    }
    if (rune.id === 'tienlen') {
        player.tienLenStage = 0;
        player.tienLenStacks = 0;
        player.tienLenTimer = 0;
        player.speed = player.baseSpeed || 5.5;
    }
    if (rune.id === 'thukhoaa00') {
        player.a00Timer = 0;
        player.a00Num1 = null;
        player.a00Op = null;
        player.a00Num2 = null;
        player.a00Result = null;
    }
    if (rune.id === 'maphaplienhoi') {
        player.isMaPhapActive = false;
        player.maPhapLienHoiTimer = 0;
    }
    if (rune.id === 'tungtungsahur') {
        if (player.isTungTung) {
            player.isTungTung = false;
            player.tungTungLives = 0;
            player.hp = player.tungTungSavedHp || player.maxHp;
        }
    }
}

// Xóa phù hiệu tại slot i và tự động xóa mọi slot phía sau nó (i+1, i+2, ...)
function removeRuneDebug(playerIndex, slotIndex) {
    let player = (playerIndex === 1) ? player1 : player2;
    if (!player || !player.runes) return;

    for (let i = slotIndex; i < 4; i++) {
        if (player.runes[i]) {
            revertRuneEffect(player, player.runes[i]);
            player.runes[i] = null;
        }
    }

    renderRuneDebugModal();
}

// Trang bị phù hiệu qua Debug
function equipRuneDebug(playerIndex, slotIndex, runeId) {
    let player = (playerIndex === 1) ? player1 : player2;
    if (!player) return;

    let pool = (slotIndex === 0) ? RUNES_BASIC : ((slotIndex === 1 || slotIndex === 2) ? RUNES_INTERMEDIATE : RUNES_ADVANCED);
    let rune = pool.find(r => r.id === runeId);
    if (!rune) return;

    player.pendingChoices = [rune];
    rune.targetSlot = slotIndex;
    selectRuneChoice(player, 0);

    renderRuneDebugModal();
}

// Mở / Đóng Modal Debug Phù Hiệu
function openRuneDebugModal(playerIndex) {
    activeDebugPlayerIndex = playerIndex;
    let modal = document.getElementById('rune-debug-modal-overlay');

    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'rune-debug-modal-overlay';
        modal.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
            background: rgba(0, 0, 0, 0.88); z-index: 12000;
            display: flex; justify-content: center; align-items: center;
            font-family: 'Courier New', Courier, monospace;
        `;
        modal.onclick = (e) => {
            if (e.target.id === 'rune-debug-modal-overlay') closeRuneDebugModal();
        };

        modal.innerHTML = `
            <div style="width: 900px; max-height: 85vh; background: #181818; border: 3px solid #8a2be2; border-radius: 12px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 0 25px rgba(138,43,226,0.6);">
                <div style="padding: 15px 20px; background: #111; border-bottom: 2px solid #333; display: flex; justify-content: space-between; align-items: center;">
                    <div id="rune-debug-title" style="font-size: 20px; font-weight: bold; color: #00ffff;">DEBUG PHÙ HIỆU</div>
                    <button onclick="closeRuneDebugModal()" style="background: #e74c3c; color: white; border: none; padding: 6px 14px; font-weight: bold; border-radius: 5px; cursor: pointer;">ĐÓNG ✖</button>
                </div>
                <div id="rune-debug-body" style="padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 20px;"></div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    modal.style.display = 'flex';
    renderRuneDebugModal();
}

function closeRuneDebugModal() {
    let modal = document.getElementById('rune-debug-modal-overlay');
    if (modal) modal.style.display = 'none';
}

function renderRuneDebugModal() {
    let player = (activeDebugPlayerIndex === 1) ? player1 : player2;
    if (!player) return;

    let titleElem = document.getElementById('rune-debug-title');
    if (titleElem) {
        titleElem.innerText = `DEBUG PHÙ HIỆU - PLAYER ${activeDebugPlayerIndex} (${player.heroType.toUpperCase()})`;
        titleElem.style.color = (activeDebugPlayerIndex === 1) ? '#ff4d4d' : '#4da6ff';
    }

    let body = document.getElementById('rune-debug-body');
    if (!body) return;
    body.innerHTML = '';

    const slotNames = [
        { name: 'Ô 1: SƠ CẤP', pool: RUNES_BASIC, color: '#00ff00' },
        { name: 'Ô 2: TRUNG CẤP 1', pool: RUNES_INTERMEDIATE, color: '#00ffff' },
        { name: 'Ô 3: TRUNG CẤP 2', pool: RUNES_INTERMEDIATE, color: '#00ffff' },
        { name: 'Ô 4: CAO CẤP', pool: RUNES_ADVANCED, color: '#ff00ff' }
    ];

    slotNames.forEach((slotInfo, slotIdx) => {
        let currentRune = player.runes ? player.runes[slotIdx] : null;
        let isSlotUnlocked = (slotIdx === 0) || (player.runes && player.runes[slotIdx - 1] !== null);

        let section = document.createElement('div');
        section.style.cssText = `
            background: #222; border: 2px solid ${slotInfo.color}; border-radius: 8px; padding: 12px;
            display: flex; flex-direction: column; gap: 10px;
        `;

        let header = document.createElement('div');
        header.style.cssText = 'display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #444; padding-bottom: 8px;';
        
        let headerLeft = document.createElement('div');
        headerLeft.innerHTML = `<span style="font-weight: bold; color: ${slotInfo.color}; font-size: 15px;">${slotInfo.name}</span>`;
        header.appendChild(headerLeft);

        if (currentRune) {
            let equippedBox = document.createElement('div');
            equippedBox.style.cssText = 'display: flex; align-items: center; gap: 10px;';
            equippedBox.innerHTML = `
                <span style="color: #ffd700; font-weight: bold;">[Đã chọn: ${currentRune.name}]</span>
                <button onclick="removeRuneDebug(${activeDebugPlayerIndex}, ${slotIdx})" style="background: #e74c3c; color: white; border: none; padding: 4px 8px; font-weight: bold; border-radius: 4px; cursor: pointer;">❌ Xóa ô này</button>
            `;
            header.appendChild(equippedBox);
        }

        section.appendChild(header);

        if (!isSlotUnlocked) {
            let lockNotice = document.createElement('div');
            lockNotice.style.cssText = 'color: #777; font-style: italic; font-size: 13px; padding: 5px;';
            lockNotice.innerText = '🔒 Cần trang bị ô trước đó để mở khóa ô này.';
            section.appendChild(lockNotice);
        } else {
            let grid = document.createElement('div');
            grid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap: 8px; max-height: 140px; overflow-y: auto; padding-right: 5px;';

            slotInfo.pool.forEach(r => {
                let isEquipped = currentRune && currentRune.id === r.id;
                let isEquippedElsewhere = player.runes && player.runes.some((eq, idx) => eq && eq.id === r.id && idx !== slotIdx);

                let card = document.createElement('button');
                card.style.cssText = `
                    background: ${isEquipped ? '#3d2600' : '#1a1a1a'};
                    border: 1.5px solid ${isEquipped ? '#ffd700' : slotInfo.color};
                    border-radius: 6px; padding: 6px; display: flex; flex-direction: column;
                    align-items: center; cursor: ${isEquippedElsewhere ? 'not-allowed' : 'pointer'};
                    opacity: ${isEquippedElsewhere ? '0.35' : '1'}; transition: 0.15s; font-family: inherit;
                `;
                card.title = `${r.name}\n${r.desc}\n${r.text}`;
                card.disabled = isEquippedElsewhere;

                card.onclick = () => {
                    equipRuneDebug(activeDebugPlayerIndex, slotIdx, r.id);
                };

                card.innerHTML = `
                    <img src="assets/gameplay/${r.id}.png" onerror="this.src='assets/gameplay/badge.png'" style="width: 32px; height: 32px; object-fit: contain; margin-bottom: 4px;">
                    <span style="font-size: 11px; font-weight: bold; color: ${isEquipped ? '#ffd700' : '#fff'}; text-align: center; line-height: 1.2;">${r.name}</span>
                `;

                grid.appendChild(card);
            });

            section.appendChild(grid);
        }

        body.appendChild(section);
    });
}

// --- LẮNG NGHE PHÍM BẤM TOÀN CỤC TRỰC TIẾP ---
window.addEventListener('keydown', (e) => {
    if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) return;

    let key = e.key.toLowerCase();

    // 1. Phím Debug mở menu phù hiệu: V (cho P1) và B (cho P2)
    if (key === 'v') {
        let modal = document.getElementById('rune-debug-modal-overlay');
        if (modal && modal.style.display === 'flex' && activeDebugPlayerIndex === 1) {
            closeRuneDebugModal();
        } else {
            openRuneDebugModal(1);
        }
        return;
    }

    if (key === 'b') {
        let modal = document.getElementById('rune-debug-modal-overlay');
        if (modal && modal.style.display === 'flex' && activeDebugPlayerIndex === 2) {
            closeRuneDebugModal();
        } else {
            openRuneDebugModal(2);
        }
        return;
    }

    if (e.key === 'Escape') {
        closeRuneDebugModal();
        return;
    }

    // 2. Chọn Phù hiệu thông thường khi nhặt quả cầu rơi trong map
    if (typeof currentMode === 'undefined' || currentMode !== 'phuhieu' || !gameActive) return;

    if (player1 && player1.pendingChoices) {
        if (key === '4') selectRuneChoice(player1, 0);
        if (key === '5') selectRuneChoice(player1, 1);
        if (key === '6') selectRuneChoice(player1, 2);
    }

    if (player2 && player2.pendingChoices) {
        if (key === '7') selectRuneChoice(player2, 0);
        if (key === '8') selectRuneChoice(player2, 1);
        if (key === '9') selectRuneChoice(player2, 2);
    }
});