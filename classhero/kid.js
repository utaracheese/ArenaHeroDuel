// --- LÁ BÀI CƠ BẢN (TRẮNG) ---
class KidCard extends Projectile {
    constructor(x, y, vx, vy = 0, owner, damage = 7, preserve = false) {
        super(x, y, vx, vy, 15, 8, '#ffffff', owner, damage, preserve);
        this.trail = [];
    }

    update() {
        this.trail.push({ x: this.x, y: this.y });
        if (this.trail.length > 5) this.trail.shift();
        super.update();
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        for (let t of this.trail) ctx.fillRect(t.x, t.y, this.width, this.height);
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 5;
        ctx.shadowColor = '#fff';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

    applyEffect(target) {
        playSkillSound('assets/sounds/sound_skill/kid/basic_hit.ogg');
        super.applyEffect(target);
    }
}

// --- CHIÊU 1: CHIM BỒ CÂU ---
class KidDove extends Projectile {
    constructor(x, y, vx, owner) {
        super(x, y, vx, 0, 25, 15, '#ffffff', owner, 22, true);
        this.hitTargets = [];
        this.flap = 0;
    }

    update() {
        super.update();
        this.flap += 0.3;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#fff';
        ctx.beginPath();
        ctx.ellipse(this.x + 12, this.y + 7, 12, 6, 0, 0, Math.PI * 2);
        ctx.fill();

        let wingY = Math.sin(this.flap) * 12;
        ctx.beginPath();
        ctx.moveTo(this.x + 12, this.y + 7);
        ctx.lineTo(this.x + 4, this.y + 7 - wingY);
        ctx.lineTo(this.x + 18, this.y + 7 - wingY);
        ctx.fill();
        ctx.restore();
    }

    applyEffect(target) {
        if (!this.hitTargets.includes(target)) {
            playSkillSound('assets/sounds/sound_skill/kid/c1_hit.ogg');
            target.takeDamage(this.damage);
            this.hitTargets.push(target);
        }
    }
}

// --- 4 LOẠI BÀI MÀU ĐẶC BIỆT ---
// Types:
// 'red'   : Hitbox lớn (36x20), 20 dame
// 'yellow': Hitbox cơ bản (15x8), 8 dame, stun 1.5s (90 frames)
// 'orange': Hitbox cơ bản (15x8), 11 dame, slow 50% trong 3s (180 frames)
// 'blue'  : Hitbox nhỏ (10x5), bay siêu nhanh, 27 dame
class KidColorCard extends Projectile {
    constructor(x, y, vx, vy, owner, cardType = 'red', isC2 = false) {
        let w = 15, h = 8, dmg = 7, col = '#ffffff';

        if (cardType === 'red') {
            w = 36; h = 20; dmg = 20; col = '#ff3333';
        } else if (cardType === 'yellow') {
            w = 15; h = 8; dmg = 8; col = '#ffff00';
        } else if (cardType === 'orange') {
            w = 15; h = 8; dmg = 11; col = '#ff9900';
        } else if (cardType === 'blue') {
            w = 10; h = 5; dmg = 27; col = '#00e5ff';
            vx *= 1.45; // Tăng tốc độ bay cho bài xanh nước
            vy *= 1.45;
        }

        super(x, y, vx, vy, w, h, col, owner, dmg, false);
        this.cardType = cardType;
        this.isC2 = isC2;
        this.trail = [];
        this.angle = Math.atan2(vy, vx);
    }

    update() {
        this.trail.push({ x: this.x + this.width / 2, y: this.y + this.height / 2 });
        if (this.trail.length > 8) this.trail.shift();

        this.x += this.vx;
        this.y += this.vy;

        // Hiệu ứng hạt bụi cho bài đỏ
        if (this.cardType === 'red' && Math.random() < 0.4) {
            effects.push(new Explosion(this.x + Math.random() * this.width, this.y + Math.random() * this.height, 4, 'rgba(255, 0, 0, 0.6)'));
        }

        // Xử lý va chạm biên giới bản đồ ở Chiêu 2 -> Nổ ra 10 lá bài tròn 36 độ
        if (this.isC2) {
            let hitBorder = false;
            let spawnX = this.x + this.width / 2;
            let spawnY = this.y + this.height / 2;

            if (this.x <= 0) {
                hitBorder = true;
                spawnX = 5;
            } else if (this.x + this.width >= canvas.width) {
                hitBorder = true;
                spawnX = canvas.width - 5;
            } else if (this.y <= 0) {
                hitBorder = true;
                spawnY = 5;
            } else if (this.y + this.height >= canvas.height - groundHeight) {
                hitBorder = true;
                spawnY = canvas.height - groundHeight - 5;
            }

            if (hitBorder) {
                this.active = false;
                this.shatterIntoCards(spawnX, spawnY);
                return;
            }
        }

        if (this.x < -100 || this.x > canvas.width + 100 || this.y < -100 || this.y > canvas.height + 100) {
            this.active = false;
        }
    }

    shatterIntoCards(bx, by) {
        effects.push(new Explosion(bx, by, 35, this.color));
        let baseRandomAngle = Math.random() * Math.PI * 2; // Góc quay gốc ngẫu nhiên
        let step = (Math.PI * 2) / 10; // 36 độ mỗi hướng
        let speed = 12;

        for (let i = 0; i < 10; i++) {
            let curAngle = baseRandomAngle + i * step;
            let vx = Math.cos(curAngle) * speed;
            let vy = Math.sin(curAngle) * speed;
            projectiles.push(new KidCard(bx - 7, by - 4, vx, vy, this.owner, 7, false));
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();

        // Vẽ vệt đuôi
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = this.color;
        for (let t of this.trail) {
            ctx.beginPath();
            ctx.arc(t.x, t.y, this.height / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1.0;

        // Đổ bóng phát sáng
        ctx.shadowBlur = this.cardType === 'red' ? 20 : 12;
        ctx.shadowColor = this.color;

        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);

        ctx.fillStyle = this.color;
        ctx.fillRect(-this.width / 2, -this.height / 2, this.width, this.height);

        // Lõi sáng trắng
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(-this.width / 2 + 2, -this.height / 2 + 2, Math.max(1, this.width - 4), Math.max(1, this.height - 4));

        ctx.restore();
    }

    applyEffect(target) {
        playSkillSound('assets/sounds/sound_skill/kid/c2_hit.ogg');
        target.takeDamage(this.damage);

        if (this.cardType === 'yellow') {
            // Choáng 1.5s = 90 frames
            target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 90, 0, 60);
            effects.push(new DamageText(target.x, target.y - 20, "STUN!", '#ffff00'));
        } else if (this.cardType === 'orange') {
            // Làm chậm 50% trong 3s = 180 frames
            target.addStatus('snowless', 'debuff', 'assets/icon/debuff/snowless.png', 180, 50, 60);
            effects.push(new DamageText(target.x, target.y - 20, "-50% SPD", '#ff9900'));
        }

        effects.push(new Explosion(target.x + target.width / 2, target.y + target.height / 2, 25, this.color));
        this.active = false;
    }
}