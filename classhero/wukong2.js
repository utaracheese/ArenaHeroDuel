// =========================================================================
// WUKONG V2 (NGỘ KHÔNG CHIẾU GƯƠNG / PHÂN THÂN ĐỐI XỨNG)
// =========================================================================

// --- ĐÒN ĐÁNH THƯỜNG ---
class Wukong2BasicStrike extends Projectile {
    constructor(x, y, dir, owner, isClone = false) {
        let dmg = isClone ? 7 : 10;
        super(x, y, 0, 0, 125, 50, 'transparent', owner, dmg, true);
        this.timer = 10; // 0.16s
        this.hitTargets = [];
        this.dir = dir;
        this.isClone = isClone;
    }
    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = this.isClone ? 'rgba(0, 255, 255, 0.6)' : 'rgba(255, 215, 0, 0.6)';
        ctx.fillRect(this.x, this.y + 20, this.width, 10);
        ctx.restore();
    }
    applyEffect(target) {
        if (!this.hitTargets.includes(target) && target !== this.owner) {
            target.takeDamage(this.damage);
            this.hitTargets.push(target);
            effects.push(new Explosion(target.x + 15, target.y + 25, 25, this.isClone ? '#00ffff' : '#ffd700'));
        }
    }
}

// --- CHIÊU 1: PHÓNG GẬY BAY 400PX HOẶC DỪNG KHI TRÚNG ĐÍCH -> QUAY GẬY TỐC ĐỘ CAO ---
class Wukong2StaffThrow extends Projectile {
    constructor(startX, startY, dir, owner, isClone = false) {
        let dmg = isClone ? 12 : 20;
        super(startX, startY, dir * 25, 0, 40, 20, 'transparent', owner, dmg, false);
        this.startX = startX;
        this.dir = dir;
        this.isClone = isClone;
        this.maxDistance = 400;
        this.state = 'flying'; // 'flying' hoặc 'spinning'
        this.spinTimer = 180; // Quay trong 3 giây (180 frames)
        this.damageCooldown = 0;
    }
    update() {
        if (this.state === 'flying') {
            this.x += this.vx;
            // Kiểm tra va chạm trên đường bay
            let enemy = (this.owner === player1) ? player2 : player1;
            if (checkCollision(this, enemy) && !enemy.isDead) {
                enemy.takeDamage(this.damage);
                effects.push(new Explosion(enemy.x + 15, enemy.y + 25, 35, this.isClone ? '#00ffff' : '#ffd700'));
                
                // Tích 3 điểm nội tại khi phi trúng
                let cur = this.owner.getStatusValue('wukong2_clone_point');
                this.owner.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', cur + 3);
                
                // Dừng lại và chuyển sang dạng xoay gậy
                this.state = 'spinning';
                this.vx = 0;
                this.width = 70;
                this.height = 70;
                this.x = enemy.x + (enemy.width / 2) - 35;
                this.y = enemy.y + (enemy.height / 2) - 35;
            } else {
                let dist = Math.abs(this.x - this.startX);
                if (dist >= this.maxDistance || this.x <= 0 || this.x >= canvas.width - this.width) {
                    this.state = 'spinning';
                    this.vx = 0;
                    this.width = 70;
                    this.height = 70;
                    this.x = Math.max(10, Math.min(canvas.width - 80, this.x));
                }
            }
        } else if (this.state === 'spinning') {
            this.spinTimer--;
            if (this.damageCooldown > 0) this.damageCooldown--;

            // Gây 10 dame/s (6 với bóng) -> mỗi 60 frame gây dame
            if (this.damageCooldown <= 0) {
                let enemy = (this.owner === player1) ? player2 : player1;
                if (checkCollision(this, enemy) && !enemy.isDead) {
                    let spinDmg = this.isClone ? 6 : 10;
                    enemy.takeDamage(spinDmg);
                    this.damageCooldown = 60; // 1s cooldown giữa mỗi nhát gây sát thương
                    effects.push(new Explosion(enemy.x + 15, enemy.y + 25, 20, this.isClone ? '#00ffff' : '#ffd700'));

                    // Chỉ tích điểm ở bản thể gốc
                    if (!this.isClone) {
                        let cur = this.owner.getStatusValue('wukong2_clone_point');
                        this.owner.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', cur + 1);
                    }
                }
            }

            if (this.spinTimer <= 0) {
                this.active = false;
            }
        }
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        ctx.translate(cx, cy);

        if (this.state === 'flying') {
            ctx.rotate(Date.now() / 50);
            ctx.fillStyle = this.isClone ? '#00ffff' : '#ffd700';
            ctx.fillRect(-25, -4, 50, 8);
            ctx.fillStyle = '#ff3333';
            ctx.fillRect(-25, -5, 10, 10);
            ctx.fillRect(15, -5, 10, 10);
        } else {
            // Xoay gậy với tốc độ cao
            ctx.rotate(Date.now() / 20);
            ctx.strokeStyle = this.isClone ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 215, 0, 0.8)';
            ctx.lineWidth = 6;
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.isClone ? '#00ffff' : '#ffd700';
            ctx.beginPath();
            ctx.arc(0, 0, 30, 0, Math.PI * 2);
            ctx.stroke();

            ctx.fillStyle = this.isClone ? '#00ffff' : '#ffd700';
            ctx.fillRect(-35, -4, 70, 8);
        }
        ctx.restore();
    }
    applyEffect() {}
}

// --- CHIÊU 2 (DẠNG THƯỜNG): CUNG TRÒN 1/4 TỪ TRÊN XUỐNG 200PX ---
class Wukong2S2SlashArc extends Projectile {
    constructor(cx, cy, dir, owner, isClone = false) {
        let dmg = isClone ? 18 : 30;
        super(cx - 100, cy - 100, 0, 0, 200, 200, 'transparent', owner, dmg, true);
        this.cx = cx;
        this.cy = cy;
        this.dir = dir;
        this.isClone = isClone;
        this.timer = 15;
        this.hitTargets = [];
    }
    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = this.isClone ? '#00ffff' : '#ffd700';
        ctx.lineWidth = 10;
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.isClone ? '#00ffff' : '#ffd700';

        let startAngle = this.dir > 0 ? -Math.PI / 2 : Math.PI;
        let endAngle = this.dir > 0 ? 0 : (3 * Math.PI) / 2;

        ctx.beginPath();
        ctx.arc(this.cx, this.cy, 100, startAngle, endAngle, false);
        ctx.stroke();
        ctx.restore();
    }
    applyEffect(target) {
        if (!this.hitTargets.includes(target) && target !== this.owner) {
            target.takeDamage(this.damage);
            this.hitTargets.push(target);
            effects.push(new Explosion(target.x + 15, target.y + 25, 40, this.isClone ? '#00ffff' : '#ffd700'));

            // Tích điểm nội tại
            let add = this.isClone ? 1 : 2;
            let cur = this.owner.getStatusValue('wukong2_clone_point');
            this.owner.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', cur + add);
        }
    }
}

// --- CHIÊU 2 (KHI ĐANG ĐỔI CHỖ / LƯỚT): VUNG GẬY TRÒN 360 ĐỘ TRONG 0.9S ---
class Wukong2SpinAoE extends Projectile {
    constructor(targetPlayer, isClone = false) {
        let dmg = isClone ? 16 : 26;
        super(0, 0, 0, 0, 140, 140, 'transparent', targetPlayer, dmg, true);
        this.targetPlayer = targetPlayer;
        this.isClone = isClone;
        this.timer = 54; // 0.9 giây (54 frames)
        this.hitTargets = [];
    }
    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
            return;
        }

        // Bám theo bản thể hoặc bóng
        let cx = this.isClone ? this.targetPlayer.cloneX + 15 : this.targetPlayer.x + 15;
        let cy = this.isClone ? this.targetPlayer.cloneY + 25 : this.targetPlayer.y + 25;
        this.x = cx - 70;
        this.y = cy - 70;

        let enemy = (this.targetPlayer === player1) ? player2 : player1;
        if (checkCollision(this, enemy) && !this.hitTargets.includes(enemy) && !enemy.isDead) {
            enemy.takeDamage(this.damage);
            this.hitTargets.push(enemy);
            effects.push(new Explosion(enemy.x + 15, enemy.y + 25, 45, this.isClone ? '#00ffff' : '#ffd700'));

            // Nhận 20 giáp ảo trong 3s (180 frames)
            this.targetPlayer.addStatus('hshield', 'buff', 'assets/icon/buff/hshield.png', 180, 20);
        }
    }
    draw() {
        if (!this.active) return;
        ctx.save();
        let cx = this.x + 70;
        let cy = this.y + 70;
        ctx.translate(cx, cy);
        ctx.rotate(Date.now() / 40);

        ctx.strokeStyle = this.isClone ? 'rgba(0, 255, 255, 0.8)' : 'rgba(255, 215, 0, 0.8)';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 12;
        ctx.shadowColor = this.isClone ? '#00ffff' : '#ffd700';

        ctx.beginPath();
        ctx.arc(0, 0, 65, 0, Math.PI * 2);
        ctx.stroke();

        ctx.restore();
    }
    applyEffect() {}
}

// =========================================================================
// HỆ THỐNG QUẢN LÝ UPDATE VÀ SKILL CHO WUKONG V2
// =========================================================================

function initWukong2(player) {
    player.cloneX = canvas.width - player.x - player.width;
    player.cloneY = player.y;
    player.cloneFacingRight = !player.facingRight;
    player.isWukong2Swapping = false;
    player.wukong2SwapTimer = 0;
    player.wukong2DecayTimer = 0;

    // Khởi tạo điểm nội tại ban đầu = 0
    player.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', 0);
}

function updateWukong2(player) {
    if (!player || player.heroType !== 'wukong2' || player.isDead) return;

    if (player.cloneX === undefined) {
        initWukong2(player);
    }

    // 1. Trừ 1 điểm nội tại mỗi 5 giây (300 frames) nếu điểm > 0
    player.wukong2DecayTimer = (player.wukong2DecayTimer || 0) + 1;
    if (player.wukong2DecayTimer >= 300) {
        player.wukong2DecayTimer = 0;
        let cur = player.getStatusValue('wukong2_clone_point');
        if (cur > 0) {
            player.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', cur - 1);
        }
    }

    // 2. Logic lướt đổi chỗ (Chiêu 3 Swap)
    if (player.isWukong2Swapping) {
        player.wukong2SwapTimer--;
        player.vy = 0; // Không bị trọng lực làm rơi xuống

        let dx1 = player.wukong2TargetRealX - player.x;
        let dy1 = player.wukong2TargetRealY - player.y;
        let dist1 = Math.hypot(dx1, dy1);

        let speed = 35;
        if (dist1 > speed) {
            player.x += (dx1 / dist1) * speed;
            player.y += (dy1 / dist1) * speed;
        } else {
            player.x = player.wukong2TargetRealX;
            player.y = player.wukong2TargetRealY;
        }

        let dx2 = player.wukong2TargetCloneX - player.cloneX;
        let dy2 = player.wukong2TargetCloneY - player.cloneY;
        let dist2 = Math.hypot(dx2, dy2);
        if (dist2 > speed) {
            player.cloneX += (dx2 / dist2) * speed;
            player.cloneY += (dy2 / dist2) * speed;
        } else {
            player.cloneX = player.wukong2TargetCloneX;
            player.cloneY = player.wukong2TargetCloneY;
        }

        // Tạo bóng mờ
        if (Math.random() < 0.5) {
            effects.push(new Explosion(player.x + 15, player.y + 25, 20, '#ffd700'));
            effects.push(new Explosion(player.cloneX + 15, player.cloneY + 25, 20, '#00ffff'));
        }

        if (player.wukong2SwapTimer <= 0 || (dist1 <= speed && dist2 <= speed)) {
            player.isWukong2Swapping = false;
            player.x = player.wukong2TargetRealX;
            player.y = player.wukong2TargetRealY;
            player.cloneX = player.wukong2TargetCloneX;
            player.cloneY = player.wukong2TargetCloneY;
        }
    } else {
        // Đồng bộ vị trí đối xứng của bóng qua trục trung tâm bản đồ
        player.cloneX = canvas.width - player.x - player.width;
        player.cloneY = player.y;
        player.cloneFacingRight = !player.facingRight;
    }
}

function handleWukong2Skill(player, skillKey) {
    let enemy = (player === player1) ? player2 : player1;
    let dir = player.facingRight ? 1 : -1;
    let cloneDir = -dir;

    if (skillKey === 'basic') {
        let pRealX = player.facingRight ? player.x + player.width : player.x - 125;
        projectiles.push(new Wukong2BasicStrike(pRealX, player.y, dir, player, false));

        let pCloneX = player.cloneFacingRight ? player.cloneX + player.width : player.cloneX - 125;
        projectiles.push(new Wukong2BasicStrike(pCloneX, player.cloneY, cloneDir, player, true));
        player.cds.basic = 20;
    }
    else if (skillKey === 'c1') {
        let pRealX = player.facingRight ? player.x + player.width + 5 : player.x - 45;
        projectiles.push(new Wukong2StaffThrow(pRealX, player.y + 15, dir, player, false));

        let pCloneX = player.cloneFacingRight ? player.cloneX + player.width + 5 : player.cloneX - 45;
        projectiles.push(new Wukong2StaffThrow(pCloneX, player.cloneY + 15, cloneDir, player, true));
        player.cds.c1 = 300; // Hồi 5 giây
    }
    else if (skillKey === 'c2') {
        if (player.isWukong2Swapping) {
            // Đang lướt đổi chỗ: vung gậy thành hình tròn 360 độ trong 0.9s
            projectiles.push(new Wukong2SpinAoE(player, false));
            projectiles.push(new Wukong2SpinAoE(player, true));
        } else {
            // Vụt gậy trước mặt 200px (1/4 cung tròn từ trên xuống)
            let slashRealX = player.facingRight ? player.x + player.width : player.x;
            projectiles.push(new Wukong2S2SlashArc(slashRealX, player.y + 25, dir, player, false));

            let slashCloneX = player.cloneFacingRight ? player.cloneX + player.width : player.cloneX;
            projectiles.push(new Wukong2S2SlashArc(slashCloneX, player.cloneY + 25, cloneDir, player, true));
        }
        player.cds.c2 = 360; // Hồi 6 giây
    }
    else if (skillKey === 'c3') {
        let curPoints = player.getStatusValue('wukong2_clone_point');
        if (curPoints > 0) {
            player.addStatus('wukong2_clone_point', 'buff', 'assets/icon/buff/wukong2_stack.png', 'inf', curPoints - 1);

            // Bắt đầu lướt hoán đổi vị trí
            player.isWukong2Swapping = true;
            player.wukong2SwapTimer = 15; // 0.25s
            player.wukong2TargetRealX = player.cloneX;
            player.wukong2TargetRealY = player.cloneY;
            player.wukong2TargetCloneX = player.x;
            player.wukong2TargetCloneY = player.y;

            player.cds.c3 = 9; // 0.15s (9 frames ở 60 FPS)
            effects.push(new Explosion(player.x + 15, player.y + 25, 30, '#ffd700'));
            effects.push(new Explosion(player.cloneX + 15, player.cloneY + 25, 30, '#00ffff'));
        } else {
            effects.push(new DamageText(player.x, player.y - 20, "HẾT ĐIỂM BÓNG!", '#ff3333'));
        }
    }
}

// --- VẼ BÓNG CHIẾU GƯƠNG ĐỐI XỨNG CỦA WUKONG V2 ---
function drawWukong2Clone(player) {
    if (!player || player.heroType !== 'wukong2' || player.isDead || player.cloneX === undefined) return;

    ctx.save();
    let cx = player.cloneX + player.width / 2;
    let cy = player.cloneY + player.height / 2;

    // Bóng ma ánh Cyan trong suốt
    ctx.globalAlpha = 0.7;

    ctx.fillStyle = '#005577';
    ctx.fillRect(player.cloneX - 2, player.cloneY, player.width + 4, player.height);

    ctx.fillStyle = '#00ffff';
    ctx.fillRect(player.cloneX, player.cloneY + 15, player.width, 20);
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(player.cloneX + 5, player.cloneY + 35, 20, 10);

    // Đuôi khỉ bóng
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 4;
    ctx.beginPath();
    if (player.cloneFacingRight) {
        ctx.moveTo(player.cloneX, player.cloneY + 40);
        ctx.quadraticCurveTo(player.cloneX - 20, player.cloneY + 30, player.cloneX - 15, player.cloneY + 20);
    } else {
        ctx.moveTo(player.cloneX + player.width, player.cloneY + 40);
        ctx.quadraticCurveTo(player.cloneX + player.width + 20, player.cloneY + 30, player.cloneX + player.width + 15, player.cloneY + 20);
    }
    ctx.stroke();

    // Mặt & Kim cô bóng
    ctx.fillStyle = '#cceeff';
    ctx.fillRect(player.cloneX + 4, player.cloneY + 4, player.width - 8, 12);
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(player.cloneX, player.cloneY + 2, player.width, 3);

    // Mắt rực ánh xanh
    ctx.fillStyle = '#00ffff';
    let eyeX = player.cloneFacingRight ? player.cloneX + 18 : player.cloneX + 6;
    ctx.fillRect(eyeX, player.cloneY + 6, 6, 3);

    // Gậy phân thân
    ctx.fillStyle = '#00ffff';
    ctx.fillRect(player.cloneFacingRight ? player.cloneX - 10 : player.cloneX + player.width + 2, player.cloneY + 15, 8, 30);

    ctx.restore();
}