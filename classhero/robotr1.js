// ================= HỆ THỐNG QUẢN LÝ SPRITE PIXEL CHO ROBOT-R1 =================
const RobotR1Sprites = {
    plasmaOrb: [],
    chargeUp: [],
    emp: [],
    hit: []
};

// Hàm hỗ trợ tiền tải (Preload) các frame từ đường dẫn: assets/skill_effect/robotR1/...
(function initRobotR1Sprites() {
    const basePath = 'assets/skill_effect/robotR1';

    const loadFrames = (folderName, totalFrames, targetArray) => {
        for (let i = 1; i <= totalFrames; i++) {
            let img = new Image();
            // Thử load chuẩn định dạng 3 số: frame001.png
            let frameNum = i.toString().padStart(3, '0');
            img.src = `${basePath}/${folderName}/frame${frameNum}.png`;

            // Fallback: nếu tên file của bạn đặt là frame1.png thì tự chuyển sang load đúng
            img.onerror = () => {
                if (!img.src.includes(`frame${i}.png`)) {
                    img.src = `${basePath}/${folderName}/frame${i}.png`;
                }
            };
            targetArray.push(img);
        }
    };

    loadFrames('Plasma Orb', 16, RobotR1Sprites.plasmaOrb);
    loadFrames('Charge Up', 16, RobotR1Sprites.chargeUp);
    loadFrames('EMP', 6, RobotR1Sprites.emp);
    loadFrames('Hit', 6, RobotR1Sprites.hit);
})();

// Hàm vẽ ảnh Pixel phóng to sắc nét tuyệt đối (tắt khử răng cưa/smoothing)
function drawPixelSprite(ctx, img, x, y, width, height, flipX = false) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    ctx.save();
    ctx.imageSmoothingEnabled = false; // Giữ nguyên độ sắc cạnh của từng pixel 32px
    if (flipX) {
        ctx.translate(x + width, y);
        ctx.scale(-1, 1);
        ctx.drawImage(img, 0, 0, width, height);
    } else {
        ctx.drawImage(img, x, y, width, height);
    }
    ctx.restore();
}

// ================= CÁC LỚP HIỆU ỨNG ANIMATION PIXEL =================

// 1. Hiệu ứng EMP (6 frames) khi nổ cầu điện
class PixelEmpEffect {
    constructor(x, y, size = 64) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.frameInterval = 4; // Tốc độ chạy khung hình
        this.active = true;
    }

    update() {
        this.frameTimer++;
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.currentFrame++;
            if (this.currentFrame >= RobotR1Sprites.emp.length) {
                this.active = false;
            }
        }
    }

    draw() {
        if (!this.active) return;
        let img = RobotR1Sprites.emp[this.currentFrame];
        drawPixelSprite(ctx, img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

// 2. Hiệu ứng Hit (Random frame 1-6) xuất hiện chớp nhoáng trên đối thủ
class PixelHitSpark {
    constructor(x, y, size = 48) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.frameIndex = Math.floor(Math.random() * RobotR1Sprites.hit.length);
        this.timer = 6; // Tồn tại trong 6 frame (0.1 giây)
        this.active = true;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        let img = RobotR1Sprites.hit[this.frameIndex];
        drawPixelSprite(ctx, img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
    }
}

// 3. Hiệu ứng tụ lực Charge Up (16 frames) hiển thị khi Robot-R1 đang vận Chiêu 1
class PixelChargeUpAnimation {
    constructor(owner) {
        this.owner = owner;
        this.currentFrame = 0;
        this.active = true;
    }

    update() {
        if (!this.owner || !this.owner.isChanneling || this.owner.pendingSkill !== 'c1') {
            this.active = false;
            return;
        }
        // Đồng bộ 16 frame chuẩn xác theo tiến trình channelMax
        let progress = 1 - (this.owner.channelTimer / Math.max(1, this.owner.channelMax));
        this.currentFrame = Math.min(15, Math.floor(progress * 16));
    }

    draw() {
        if (!this.active) return;
        let img = RobotR1Sprites.chargeUp[this.currentFrame];
        let size = 64;
        let drawX = this.owner.x + this.owner.width / 2 - size / 2;
        let drawY = this.owner.y + this.owner.height / 2 - size / 2;
        drawPixelSprite(ctx, img, drawX, drawY, size, size);
    }
}

// ================= CÁC LỚP ĐẠN & KỸ NĂNG NÂNG CẤP =================

class EnergyBounceBullet extends Projectile {
    constructor(x, y, vx, vy, owner) {
        super(x, y, vx, vy, 12, 12, '#00ffcc', owner, 7, false);
        this.bounceCount = 0;
        this.maxBounces = 3;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        let bounced = false;

        if (this.x <= 0) {
            this.x = 0;
            this.vx *= -1;
            bounced = true;
        } else if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
            this.vx *= -1;
            bounced = true;
        }

        if (this.y + this.height >= canvas.height - groundHeight) {
            this.y = canvas.height - groundHeight - this.height;
            this.vy *= -1;
            bounced = true;
        }

        if (bounced) {
            if (typeof playSkillSound !== 'undefined') {
                playSkillSound('assets/sounds/sound_skill/robot-R1/basic_hitwall.ogg');
            }

            this.bounceCount++;
            if (this.bounceCount > this.maxBounces) {
                this.active = false;
            } else {
                let currentAngle = Math.atan2(this.vy, this.vx);
                let randomDev = (Math.random() * (Math.PI / 4)) - (Math.PI / 8);
                let speed = Math.hypot(this.vx, this.vy);
                this.vx = Math.cos(currentAngle + randomDev) * speed;
                this.vy = Math.sin(currentAngle + randomDev) * speed;
            }
        }
    }

    applyEffect(target) {
        if (typeof playSkillSound !== 'undefined') {
            playSkillSound('assets/sounds/sound_skill/robot-R1/basic_hit.ogg');
        }
        effects.push(new PixelHitSpark(this.x + this.width / 2, this.y + this.height / 2, 32));
        super.applyEffect(target);
    }

    draw() {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

// 4. Lớp Cầu Điện nâng cấp hình ảnh Plasma Orb (16 frame) & Tia Glow thẳng xuống đất
class EnergyOrb extends Projectile {
    constructor(x, y, vx, owner) {
        super(x, y, vx, 0, 32, 32, '#00bfff', owner, 25, false);
        this.zapTimer = 0;
        this.animTimer = 0;
        this.currentFrame = 0;
        this.spriteSize = 48; // Phóng lớn để thấy rõ từng khối pixel art
    }

    update() {
        super.update();

        // Cập nhật chu kỳ animation 16 frame của Plasma Orb
        this.animTimer++;
        if (this.animTimer % 2 === 0) {
            this.currentFrame = (this.currentFrame + 1) % 16;
        }

        // Quét giật tia sét vào đối thủ
        this.zapTimer++;
        if (this.zapTimer >= 3) {
            this.zapTimer = 0;
            let enemy = this.owner === player1 ? player2 : player1;
            
            if (enemy && !enemy.isDead) {
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;
                let ex = enemy.x + enemy.width / 2;
                let ey = enemy.y + enemy.height / 2;
                let dist = Math.hypot(ex - cx, ey - cy);
                
                if (dist <= 225) {
                    enemy.takeDamage(1);
                    effects.push(new LightningZap(cx, cy, ex, ey, '#00ffff')); 
                    effects.push(new PixelHitSpark(ex + (Math.random() - 0.5) * 20, ey + (Math.random() - 0.5) * 30, 48));

                    let zaps = ['c1_zip1.ogg', 'c1_zip2.ogg', 'c1_zip3.ogg'];
                    let randomZap = zaps[Math.floor(Math.random() * zaps.length)];
                    if (typeof playSkillSound !== 'undefined') playSkillSound('assets/sounds/sound_skill/robot-R1/' + randomZap);
                }
            }
        }
    }

    applyEffect(target) {
        if (typeof playSkillSound !== 'undefined') playSkillSound('assets/sounds/sound_skill/robot-R1/c1_hit.ogg');
        // Kích hoạt hiệu ứng nổ EMP (6 frames) ngay tại điểm chạm
        effects.push(new PixelEmpEffect(this.x + this.width / 2, this.y + this.height / 2, 70));
        super.applyEffect(target);
    }

    draw() {
        if (!this.active) return;
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        let floorY = canvas.height - groundHeight;

        ctx.save();
        // --- VẼ TIA SÁNG GLOW CỰC HẸP NỐI TỪ TRUNG TÂM XUỐNG ĐẤT ---
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#00ffff';

        // Lớp glow mờ bên ngoài
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, floorY);
        ctx.stroke();

        // Lõi tia laser sáng trắng siêu hẹp bên trong
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, floorY);
        ctx.stroke();

        // Điểm tiếp xúc sáng dưới mặt đất
        ctx.fillStyle = '#00ffff';
        ctx.beginPath();
        ctx.ellipse(cx, floorY, 6, 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // --- VẼ HOẠT ẢNH PLASMA ORB PIXEL (16 FRAMES) ---
        let img = RobotR1Sprites.plasmaOrb[this.currentFrame];
        drawPixelSprite(
            ctx, 
            img, 
            cx - this.spriteSize / 2, 
            cy - this.spriteSize / 2, 
            this.spriteSize, 
            this.spriteSize
        );
    }
}

class ExplosiveEnergyBall extends Projectile {
    constructor(x, y, vx, owner) {
        super(x, y, vx, 0, 30, 30, '#ff3300', owner, 50, false);
        this.hasExploded = false;
    }

    update() {
        if (this.hasExploded) return;
        this.x += this.vx;

        // Cơ chế hợp nhất: Tìm và kiểm tra va chạm với EnergyOrb (Chiêu 1) của bản thân
        for (let proj of projectiles) {
            if (proj instanceof EnergyOrb && proj.active && proj.owner === this.owner) {
                let dx = (proj.x + proj.width / 2) - (this.x + this.width / 2);
                let dy = (proj.y + proj.height / 2) - (this.y + this.height / 2);
                let dist = Math.hypot(dx, dy);

                if (dist < (proj.width / 2 + this.width / 2)) {
                    proj.active = false;
                    this.active = false;

                    let midX = (proj.x + this.x) / 2;
                    let midY = (proj.y + this.y) / 2;
                    effects.push(new PixelEmpEffect(midX, midY, 96));

                    let speed = 1.5;
                    let angle = Math.atan2(this.vy, this.vx);
                    if (this.vx === 0 && this.vy === 0) {
                        angle = this.owner.facingRight ? 0 : Math.PI;
                    }
                    let svx = Math.cos(angle) * speed;
                    let svy = Math.sin(angle) * speed;

                    projectiles.push(new SuperElectricOrb(midX, midY, svx, svy, this.owner));
                    return;
                }
            }
        }

        if (this.x <= 0 || this.x + this.width >= canvas.width || this.y + this.height >= canvas.height - groundHeight) {
            this.explode(true);
        }
    }

    explode(hitWall = false) {
        if (this.hasExploded) return;
        this.hasExploded = true;
        this.active = false;
        
        if (typeof playSkillSound !== 'undefined') {
            playSkillSound('assets/sounds/sound_skill/robot-R1/c3_hit.ogg');
        }

        let explosionRadius = hitWall ? 500 : 100;
        effects.push(new Explosion(this.x + this.width / 2, this.y + this.height / 2, explosionRadius, 'rgba(255, 69, 0, 0.8)'));
        effects.push(new PixelEmpEffect(this.x + this.width / 2, this.y + this.height / 2, explosionRadius));

        let checkHit = (target) => {
            let dx = (target.x + target.width / 2) - (this.x + this.width / 2);
            let dy = (target.y + target.height / 2) - (this.y + this.height / 2);
            if (Math.sqrt(dx * dx + dy * dy) < explosionRadius + Math.max(target.width, target.height) / 2) {
                target.takeDamage(this.damage);
                
                if (!hitWall && target !== this.owner) {
                    target.stunTimer = 150; 
                    effects.push(new DamageText(target.x, target.y - 30, "STUNNED!", '#ffff00'));
                }
            }
        };

        checkHit(player1);
        checkHit(player2);
        
        if (hitWall) {
            canvas.style.transform = `translate(${Math.random()*20 - 10}px, ${Math.random()*20 - 10}px)`;
            setTimeout(() => canvas.style.transform = 'none', 100);
        }
    }

    applyEffect(target) {
        this.explode(false);
    }

    draw() {
        if (!this.active) return;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#ffff00';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2, this.y + this.height / 2, this.width / 4, 0, Math.PI * 2);
        ctx.fill();
    }
}

// ================= LỚP SIÊU CẦU ĐIỆN (HỢP NHẤT CHIÊU 1 + CHIÊU 3) =================
class SuperElectricOrb extends Projectile {
    constructor(x, y, vx, vy, owner) {
        super(x, y, vx, vy, 45, 45, '#00ffff', owner, 45, false);
        this.zapTimer = 0;
        this.zapInterval = 60;
        this.pulseRadius = 400;
        this.age = 0;
        this.animTimer = 0;
        this.currentFrame = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.age++;

        this.animTimer++;
        if (this.animTimer % 2 === 0) {
            this.currentFrame = (this.currentFrame + 1) % 16;
        }

        if (this.x < -100 || this.x > canvas.width + 100 || this.y > canvas.height + 100 || this.y < -500) {
            this.active = false;
        }

        this.zapTimer++;
        if (this.zapTimer >= this.zapInterval) {
            this.zapTimer = 0;
            let enemy = this.owner === player1 ? player2 : player1;
            if (enemy && !enemy.isDead) {
                let cx = this.x + this.width / 2;
                let cy = this.y + this.height / 2;
                let ex = enemy.x + enemy.width / 2;
                let ey = enemy.y + enemy.height / 2;
                let dist = Math.hypot(ex - cx, ey - cy);

                if (dist <= this.pulseRadius) {
                    enemy.takeDamage(12);
                    effects.push(new LightningZap(cx, cy, ex, ey, '#00ffff'));
                    effects.push(new PixelHitSpark(ex, ey, 56));
                    if (typeof playSkillSound !== 'undefined') {
                        playSkillSound('assets/sounds/sound_skill/robot-R1/c1_zip1.ogg');
                    }
                }
            }
        }
    }

    applyEffect(target) {
        target.takeDamage(this.damage);
        target.addStatus('shock', 'debuff', 'assets/icon/debuff/shock.png', 600, 5, 60);
        
        effects.push(new DamageText(target.x, target.y - 30, "SHOCKED!", '#00ffff'));
        effects.push(new PixelEmpEffect(this.x + this.width / 2, this.y + this.height / 2, 130));
        
        if (typeof playSkillSound !== 'undefined') {
            playSkillSound('assets/sounds/sound_skill/robot-R1/c3_hit.ogg');
        }

        this.active = false;
    }

    draw() {
        if (!this.active) return;
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        let floorY = canvas.height - groundHeight;

        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#00ffff';

        ctx.strokeStyle = 'rgba(0, 255, 255, 0.6)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, floorY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx, floorY);
        ctx.stroke();
        ctx.restore();

        let img = RobotR1Sprites.plasmaOrb[this.currentFrame];
        drawPixelSprite(ctx, img, cx - 40, cy - 40, 80, 80);
    }
}

// ================= LỚP VÙNG NHIỄU ĐIỆN (COMBO CHIÊU 1 + CHIÊU 2) =================
class ElectricalZone {
    constructor(owner) {
        this.owner = owner;
        this.radius = 400;
        this.duration = 360;
        this.timer = this.duration;
        this.active = true;
        this.tickRate = 20;
        this.tickTimer = 0;
    }

    update() {
        this.timer--;
        if (this.timer <= 0) {
            this.active = false;
            return;
        }

        this.x = this.owner.x + this.owner.width / 2;
        this.y = this.owner.y + this.owner.height / 2;

        this.tickTimer++;
        if (this.tickTimer >= this.tickRate) {
            this.tickTimer = 0;
            let enemy = this.owner === player1 ? player2 : player1;
            if (enemy && !enemy.isDead) {
                let ex = enemy.x + enemy.width / 2;
                let ey = enemy.y + enemy.height / 2;
                let dist = Math.hypot(ex - this.x, ey - this.y);

                if (dist <= this.radius) {
                    enemy.takeDamage(1);
                    this.owner.hp = Math.min(this.owner.maxHp, this.owner.hp + 1);
                    effects.push(new DamageText(this.owner.x + 15, this.owner.y - 20, "+1", '#00ffcc'));
                    effects.push(new LightningZap(this.x, this.y, ex, ey, '#00ffcc'));
                    effects.push(new PixelHitSpark(ex, ey, 40));

                    let zaps = ['c1_zip1.ogg', 'c1_zip2.ogg', 'c1_zip3.ogg'];
                    let randomZap = zaps[Math.floor(Math.random() * zaps.length)];
                    if (typeof playSkillSound !== 'undefined') {
                        playSkillSound('assets/sounds/sound_skill/robot-R1/' + randomZap);
                    }
                }
            }
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = 'rgba(0, 255, 204, 0.12)';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + Math.sin(Date.now() / 120) * 8, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = 'rgba(0, 255, 204, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 12]);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (Math.random() < 0.25) {
            let angle = Math.random() * Math.PI * 2;
            let distance = Math.random() * this.radius;
            let lx = this.x + Math.cos(angle) * distance;
            let ly = this.y + Math.sin(angle) * distance;
            effects.push(new LightningZap(this.x, this.y, lx, ly, 'rgba(0, 255, 204, 0.5)'));
        }
        ctx.restore();
    }
}

// ================= NÂNG CẤP TIA SÉT (LIGHTNING ZAP SÁNG VÀ GLOW RỰC RỠ) =================
if (typeof LightningZap !== 'undefined') {
    LightningZap.prototype.draw = function() {
        if (!this.active) return;
        ctx.save();
        ctx.globalCompositeOperation = 'lighter';
        ctx.strokeStyle = this.color || '#00ffff';
        ctx.lineWidth = 3.5;
        ctx.shadowBlur = 20;
        ctx.shadowColor = this.color || '#00ffff';
        
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        let midX = (this.x1 + this.x2) / 2 + (Math.random() - 0.5) * 40;
        let midY = (this.y1 + this.y2) / 2 + (Math.random() - 0.5) * 40;
        ctx.lineTo(midX, midY);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(midX, midY);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();

        ctx.restore();
    };
}

// ================= CAN THIỆP GIAO DIỆN CHƯƠNG TRÌNH PLAYER =================
if (typeof Player !== 'undefined' && Player.prototype) {
    
    // Gắn hiệu ứng Charge Up vào lúc bắt đầu Vận Chiêu 1
    const originalStartChannel = Player.prototype.startChannel;
    Player.prototype.startChannel = function(skillKey, frames) {
        originalStartChannel.call(this, skillKey, frames);
        if (this.heroType === 'robot-R1' && skillKey === 'c1') {
            effects.push(new PixelChargeUpAnimation(this));
        }
    };

    const originalUpdate = Player.prototype.update;
    Player.prototype.update = function() {
        if (this.heroType === 'robot-R1' && this.isChanneling && this.pendingSkill === 'c1') {
            if (keys[this.controls.c2] && this.cds.c2 <= 0) {
                this.triggerSkill('c2');
            }
        }
        originalUpdate.call(this);
    };

    const originalTriggerSkill = Player.prototype.triggerSkill;
    Player.prototype.triggerSkill = function(skillKey) {
        if (this.heroType === 'robot-R1') {
            if (skillKey === 'c2' && this.isChanneling && this.pendingSkill === 'c1') {
                this.pendingSkill = 'robot_r1_combo';
                this.cds.c2 = 480;
                effects.push(new DamageText(this.x, this.y - 30, "INTERFERENCE COMBO!", '#00ffcc'));
                
                if (typeof playSkillSound !== 'undefined') {
                    playSkillSound('assets/sounds/sound_skill/robot-R1/c2_upshield.ogg');
                }
                return;
            }
        }
        originalTriggerSkill.call(this, skillKey);
    };

    const originalExecuteSkill = Player.prototype.executeSkill;
    Player.prototype.executeSkill = function(skillKey) {
        if (this.heroType === 'robot-R1' && skillKey === 'robot_r1_combo') {
            effects.push(new ElectricalZone(this));

            let shieldValue = Math.floor(this.maxHp * 0.05);
            this.addStatus('hshield', 'buff', 'assets/icon/buff/hshield.png', 300, shieldValue, 60);
            this.tempShield = shieldValue;

            if (typeof playSkillSound !== 'undefined') {
                playSkillSound('assets/sounds/sound_skill/robot-R1/c3_cast.ogg');
            }
            return;
        }
        originalExecuteSkill.call(this, skillKey);
    };
}