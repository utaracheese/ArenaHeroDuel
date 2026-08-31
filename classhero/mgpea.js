// =========================================================================
// TƯỚNG: MEGA GATLING PEA (mgpea) - FULL 12 FORMS & TỰ ĐỘNG CHỌN DẠNG CỐ ĐỊNH
// =========================================================================

// --- 1. TỰ ĐỘNG KHỞI TẠO GIAO DIỆN CHỌN DẠNG (INJECT UI & CSS TỪ JS) ---
(function setupMgpeaUI() {
    // Tiêm CSS giao diện dropdown
    const style = document.createElement('style');
    style.innerHTML = `
        .mgpea-form-select {
            margin-left: 8px;
            background: #111;
            color: #7cfc00;
            border: 2px solid #7cfc00;
            border-radius: 6px;
            padding: 3px 6px;
            font-family: inherit;
            font-size: 13px;
            font-weight: bold;
            cursor: pointer;
            outline: none;
            vertical-align: middle;
            box-shadow: 0 0 8px rgba(124, 252, 0, 0.4);
            transition: 0.2s;
        }
        .mgpea-form-select:hover {
            background: #222;
            box-shadow: 0 0 12px #7cfc00;
        }
        .mgpea-form-select option {
            background: #1a1a1a;
            color: #fff;
        }
    `;
    document.head.appendChild(style);

    // Danh sách 12 dạng + 1 dạng mặc định
    window.mgpeaFormsList = [
        { id: 'default', name: '⚡ Mặc định (Random C3)' },
        { id: 'scissor', name: '✂️ Kéo cắt (Ong gai)' },
        { id: 'sun', name: '☀️ Mặt trời' },
        { id: 'water', name: '🌊 Nước' },
        { id: 'fire', name: '🔥 Lửa' },
        { id: 'ice', name: '❄️ Băng' },
        { id: 'electric', name: '⚡ Điện' },
        { id: 'poison', name: '☠️ Độc' },
        { id: 'defense', name: '🛡️ Phòng thủ (Peanut)' },
        { id: 'primal', name: '🦖 Cổ đại' },
        { id: 'threepeater', name: '👥 3 Đầu' },
        { id: 'bomb', name: '💣 Nổ' },
        { id: 'pod', name: '🫛 Pháo đậu' }
    ];

    window.mgpeaSelectedForms = { 1: 'default', 2: 'default' };

    // Hook hàm selectHero để tự động chèn Dropdown khi pick mgpea
    const prevSelectHero = window.selectHero;
    window.selectHero = function(player, heroId, heroName) {
        if (typeof prevSelectHero === 'function') {
            prevSelectHero.apply(this, arguments);
        }

        let chosenEl = document.getElementById(player === 1 ? 'p1-chosen' : 'p2-chosen');
        if (chosenEl) {
            // Xóa dropdown cũ nếu có
            let oldSelect = chosenEl.querySelector('.mgpea-form-select');
            if (oldSelect) oldSelect.remove();

            if (heroId === 'mgpea') {
                let select = document.createElement('select');
                select.className = 'mgpea-form-select';
                select.id = `p${player}-mgpea-form-select`;

                window.mgpeaFormsList.forEach(f => {
                    let opt = document.createElement('option');
                    opt.value = f.id;
                    opt.innerText = f.name;
                    select.appendChild(opt);
                });

                select.value = window.mgpeaSelectedForms[player] || 'default';
                select.onchange = (e) => {
                    window.mgpeaSelectedForms[player] = e.target.value;
                };

                chosenEl.appendChild(select);
            } else {
                window.mgpeaSelectedForms[player] = 'default';
            }
        }
    };

    // Hook hàm startGame để tự truyền dạng đã chọn vào Player
    const prevStartGame = window.startGame;
    window.startGame = function() {
        if (typeof prevStartGame === 'function') {
            prevStartGame.apply(this, arguments);
        }
        if (typeof player1 !== 'undefined' && player1 && player1.heroType === 'mgpea') {
            player1.fixedMgpeaForm = window.mgpeaSelectedForms[1] || 'default';
            player1.initMegaGatlingPea();
        }
        if (typeof player2 !== 'undefined' && player2 && player2.heroType === 'mgpea') {
            player2.fixedMgpeaForm = window.mgpeaSelectedForms[2] || 'default';
            player2.initMegaGatlingPea();
        }
    };
})();

// --- HÀM TÍNH GÓC BẮN THEO PHÂN PHỐI PARABOL TRỌNG SỐ TÂM ---
function getParabolicSpreadAngle(maxAngleDeg) {
    let r = (Math.random() - Math.random() + Math.random() - Math.random()) / 2;
    r = Math.max(-1, Math.min(1, r));
    return r * (maxAngleDeg * Math.PI / 180);
}

// --- LỚP ĐẠN ĐẬU KHỔNG LỒ RƠI TỪ TRÊN TRỜI (DẠNG PHÁO / PEA POD) ---
class PeaPodFallingBullet {
    constructor(x, y, vy, owner, isPlatformSolid) {
        this.x = x;
        this.y = y;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = vy;
        this.owner = owner;
        this.isPlatformSolid = isPlatformSolid;

        this.radius = 13;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (Math.random() < 0.35) {
            effects.push(new FireParticle(this.x, this.y, -this.vx * 0.2, -this.vy * 0.2, 4, 10, '#adff2f'));
        }

        if (this.isPlatformSolid && typeof platforms !== 'undefined') {
            for (let plat of platforms) {
                if (this.vy > 0 && this.y + this.radius >= plat.y && this.y - this.vy <= plat.y + 10 &&
                    this.x >= plat.x && this.x <= plat.x + plat.w) {
                    this.explode(this.x, plat.y);
                    return;
                }
            }
        }

        if (typeof walls !== 'undefined') {
            for (let wall of walls) {
                if (wall.type === 'wall_hit' || wall.type === 'wall') {
                    if (this.x > wall.x && this.x < wall.x + wall.w &&
                        this.y > wall.y && this.y < wall.y + wall.h) {
                        this.explode(this.x, this.y);
                        return;
                    }
                }
            }
        }

        let groundY = canvas.height - (typeof groundHeight !== 'undefined' ? groundHeight : 50);
        if (this.y + this.radius >= groundY) {
            this.explode(this.x, groundY);
            return;
        }

        if (this.y > canvas.height + 150) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.fillStyle = '#7cfc00';
        ctx.strokeStyle = '#228b22';
        ctx.lineWidth = 2;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#adff2f';

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.x - 4, this.y - 4, this.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
    }

    explode(hitX, hitY) {
        this.active = false;
        let aoeRadius = 100;
        effects.push(new Explosion(hitX, hitY, aoeRadius, '#7cfc00'));
        for (let i = 0; i < 6; i++) {
            effects.push(new RockParticle(hitX, hitY, (Math.random() - 0.5) * 8, -Math.random() * 6, '#32cd32'));
        }

        let enemy = (this.owner === player1) ? player2 : player1;
        if (enemy && !enemy.isDead) {
            let dist = Math.hypot((enemy.x + enemy.width / 2) - hitX, (enemy.y + enemy.height / 2) - hitY);
            if (dist <= aoeRadius) {
                enemy.takeDamage(10);
            }
        }
    }

    applyEffect(target) {
        if (target === this.owner || !this.active) return;
        target.takeDamage(40);
        effects.push(new DamageText(target.x + 10, target.y - 25, "-40", '#7cfc00'));
        this.explode(this.x, this.y);
    }
}

// --- BỘ ĐIỀU KHIỂN XẢ BÃO ĐẠN RƠI DẦN DẠNG PHÁO ---
class PeaPodVolleySpawner {
    constructor(owner, totalPeas, durationFrames) {
        this.owner = owner;
        this.totalPeas = totalPeas;
        this.duration = durationFrames;
        this.timer = 0;
        this.spawned = 0;
        this.active = true;
    }

    update() {
        this.timer++;
        let targetCount = Math.floor((this.timer / this.duration) * this.totalPeas);

        while (this.spawned < targetCount && this.spawned < this.totalPeas) {
            this.spawned++;
            this.spawnSinglePea();
        }

        if (this.spawned >= this.totalPeas && this.timer >= this.duration) {
            this.active = false;
        }
    }

    spawnSinglePea() {
        let enemy = (this.owner === player1) ? player2 : player1;
        let targetX;

        if (enemy && !enemy.isDead && Math.random() < 0.8) {
            let enemyCenter = enemy.x + enemy.width / 2;
            targetX = enemyCenter + (Math.random() - 0.5) * 500;
        } else {
            targetX = Math.random() * canvas.width;
        }

        targetX = Math.max(30, Math.min(canvas.width - 30, targetX));
        let spawnY = -20 - Math.random() * 60;
        let speed = 14 + Math.random() * 5;
        let isSolidPlat = (Math.random() < 0.33);

        projectiles.push(new PeaPodFallingBullet(targetX, spawnY, speed, this.owner, isSolidPlat));
    }

    draw() {}
    applyEffect() {}
}

// --- LỚP THỰC THỂ WALL-NUT KHỔNG LỒ LĂN TRÒN ---
class RollingWallNut {
    constructor(x, y, vx, vy, owner) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.owner = owner;

        this.radius = 95;
        this.width = this.radius * 2;
        this.height = this.radius * 2;

        this.rotation = 0;
        this.active = true;
        this.contactTick = 0;
        this.preserve = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += (this.vx >= 0 ? 1 : -1) * 0.05;

        if (typeof projectiles !== 'undefined') {
            for (let p of projectiles) {
                if (p.active && p.owner !== this.owner && p !== this) {
                    let pDist = Math.hypot((p.x + (p.width || 0) / 2) - this.x, (p.y + (p.height || 0) / 2) - this.y);
                    if (pDist <= this.radius + 15) {
                        p.active = false;
                        effects.push(new Explosion(p.x, p.y, 16, '#c4894d'));
                    }
                }
            }
        }

        let enemy = (this.owner === player1) ? player2 : player1;
        if (enemy && !enemy.isDead) {
            let eDist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
            if (eDist <= this.radius + 20) {
                this.contactTick++;
                if (this.contactTick % 3 === 0) {
                    enemy.takeDamage(5);
                    effects.push(new DamageText(enemy.x + 10, enemy.y - 15, "-5", '#d2a679'));
                    effects.push(new RockParticle(enemy.x + 15, enemy.y + 25, (Math.random() - 0.5) * 6, -Math.random() * 4, '#8b5a2b'));
                }
            }
        }

        if (this.x < -300 || this.x > canvas.width + 300 || this.y < -300 || this.y > canvas.height + 300) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        let r = this.radius;
        ctx.fillStyle = '#8b5321';
        ctx.beginPath(); ctx.ellipse(0, 0, r, r * 1.08, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#bc7c3e';
        ctx.beginPath(); ctx.ellipse(0, 0, r * 0.94, r * 1.02, 0, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#d89b52';
        ctx.beginPath(); ctx.ellipse(0, 0, r * 0.82, r * 0.92, 0, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#6e3c14'; ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(-r * 0.7, 0, r * 0.5, -Math.PI / 2, Math.PI / 2); ctx.stroke();
        ctx.beginPath(); ctx.arc(r * 0.7, 0, r * 0.5, Math.PI / 2, -Math.PI / 2); ctx.stroke();

        let eyeOffsetY = -r * 0.15;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath(); ctx.arc(-r * 0.25, eyeOffsetY, r * 0.22, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(r * 0.25, eyeOffsetY, r * 0.22, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = '#000000';
        ctx.beginPath(); ctx.arc(-r * 0.2, eyeOffsetY, r * 0.08, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.arc(r * 0.3, eyeOffsetY, r * 0.08, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = '#42220e'; ctx.lineWidth = 4; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.arc(0, r * 0.15, r * 0.18, 0.2, Math.PI - 0.2); ctx.stroke();

        ctx.restore();
    }

    applyEffect(target) {}
}

// --- TIA LAZE MẶT TRỜI TỨC THÌ (INSTANT SOLAR LASER) ---
class SolarLaserBeam {
    constructor(startX, startY, angle, owner) {
        this.startX = startX;
        this.startY = startY;
        this.angle = angle;
        this.owner = owner;
        this.timer = 12; // 0.2s hiển thị
        this.active = true;

        let length = 2000;
        this.endX = startX + Math.cos(angle) * length;
        this.endY = startY + Math.sin(angle) * length;

        if (owner && !owner.isDead) {
            owner.hp = Math.min(owner.maxHp, owner.hp + 6);
            effects.push(new DamageText(owner.x + 10, owner.y - 20, "+6 HP", '#ffd700'));
        }

        let enemy = (owner === player1) ? player2 : player1;
        if (enemy && !enemy.isDead) {
            let p1 = { x: this.startX, y: this.startY };
            let p2 = { x: this.endX, y: this.endY };
            let ec = { x: enemy.x + enemy.width / 2, y: enemy.y + enemy.height / 2 };

            let L2 = Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2);
            let t = ((ec.x - p1.x) * (p2.x - p1.x) + (ec.y - p1.y) * (p2.y - p1.y)) / L2;
            t = Math.max(0, Math.min(1, t));
            let projX = p1.x + t * (p2.x - p1.x);
            let projY = p1.y + t * (p2.y - p1.y);
            let dist = Math.hypot(ec.x - projX, ec.y - projY);

            if (dist <= 35) {
                enemy.takeDamage(14);
                effects.push(new Explosion(ec.x, ec.y, 40, '#ffd700'));
            }
        }
    }

    update() {
        this.timer--;
        if (this.timer <= 0) this.active = false;
    }

    draw() {
        if (!this.active) return;
        ctx.save();
        ctx.strokeStyle = '#ffff00';
        ctx.lineWidth = 10;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#ffd700';

        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.endX, this.endY);
        ctx.stroke();

        ctx.restore();
    }

    applyEffect() {}
}

// --- LỚP ĐẠN ĐẬU ĐA DẠNG NGUYÊN TỐ & BIẾN THỂ (12 FORMS) ---
class MegaGatlingPeaBullet {
    constructor(x, y, vx, vy, owner, bulletType = 'normal', stunDuration = 0) {
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.owner = owner;
        this.bulletType = bulletType; 
        this.customStun = stunDuration;
        this.zapTimer = 0;

        if (bulletType === 'scissor') {
            this.radius = 6;
            this.damage = 10;
        } else if (bulletType === 'sun') {
            this.radius = 7;
            this.damage = 6;
        } else if (bulletType === 'water') {
            this.radius = 7.5;
            this.damage = 12;
        } else if (bulletType === 'bomb') {
            this.radius = 9;
            this.damage = 40;
        } else if (bulletType === 'primal') {
            this.radius = 11;
            this.damage = 15;
        } else if (bulletType === 'defense') {
            this.radius = 7;
            this.damage = 8;
        } else if (bulletType === 'threepeater') {
            this.radius = 4.5;
            this.damage = 5;
        } else if (bulletType === 'ice_block') {
            this.radius = 12;
            this.damage = 10;
        } else if (bulletType === 'blue_fire') {
            this.radius = 8;
            this.damage = 21;
        } else if (bulletType === 'fire') {
            this.radius = 7.5;
            this.damage = 14;
        } else if (bulletType === 'ice') {
            this.radius = 7;
            this.damage = 7;
        } else if (bulletType === 'electric') {
            this.radius = 10;
            this.damage = 0;
        } else if (bulletType === 'poison') {
            this.radius = 7;
            this.damage = 5;
        } else {
            this.radius = 6.5;
            this.damage = 7;
        }

        this.width = this.radius * 2;
        this.height = this.radius * 2;

        let extraDmg = (owner && owner.hasStatus && owner.hasStatus('strength')) ? owner.getStatusValue('strength') : 0;
        this.damage += extraDmg;

        this.active = true;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.bulletType === 'electric') {
            this.zapTimer++;
            if (this.zapTimer >= 9) {
                this.zapTimer = 0;
                let enemy = (this.owner === player1) ? player2 : player1;
                if (enemy && !enemy.isDead) {
                    let dist = Math.hypot((enemy.x + enemy.width / 2) - this.x, (enemy.y + enemy.height / 2) - this.y);
                    if (dist <= 175) {
                        enemy.takeDamage(5);
                        effects.push(new LightningZap(this.x, this.y, enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, '#00ffff'));
                    }
                }
            }

            if (Math.random() < 0.4) {
                effects.push(new LightningZap(
                    this.x + (Math.random() - 0.5) * 12, this.y + (Math.random() - 0.5) * 12,
                    this.x + (Math.random() - 0.5) * 18, this.y + (Math.random() - 0.5) * 18,
                    '#39ff14'
                ));
            }
        }

        if (this.bulletType === 'water' && Math.random() < 0.5) {
            effects.push(new RockParticle(this.x, this.y, -this.vx * 0.1, (Math.random() - 0.5) * 2, '#00bfff'));
        } else if (this.bulletType === 'sun' && Math.random() < 0.4) {
            effects.push(new FireParticle(this.x, this.y, -this.vx * 0.1, -this.vy * 0.1, 4, 10, '#ffd700'));
        } else if (this.bulletType === 'scissor' && Math.random() < 0.4) {
            effects.push(new RockParticle(this.x, this.y, -this.vx * 0.1, (Math.random() - 0.5) * 2, '#ffa500'));
        } else if (this.bulletType === 'bomb' && Math.random() < 0.5) {
            effects.push(new FireParticle(this.x, this.y, -this.vx * 0.1, -this.vy * 0.1, 4, 10, '#ff1100'));
        } else if (this.bulletType === 'primal' && Math.random() < 0.3) {
            effects.push(new RockParticle(this.x, this.y, -this.vx * 0.1, (Math.random() - 0.5) * 2, '#8b5a2b'));
        } else if (this.bulletType === 'poison' && Math.random() < 0.4) {
            effects.push(new Explosion(this.x, this.y, 4, 'rgba(170, 0, 255, 0.6)'));
        } else if (this.bulletType === 'blue_fire' && Math.random() < 0.6) {
            effects.push(new FireParticle(this.x, this.y, -this.vx * 0.15, -this.vy * 0.15, 5, 12, '#00ffff'));
        } else if (this.bulletType === 'fire' && Math.random() < 0.5) {
            effects.push(new FireParticle(this.x, this.y, -this.vx * 0.15, -this.vy * 0.15, 4, 10, '#ff4500'));
        } else if ((this.bulletType === 'ice' || this.bulletType === 'ice_block') && Math.random() < 0.4) {
            effects.push(new RockParticle(this.x, this.y, -this.vx * 0.1, (Math.random() - 0.5) * 2, '#e0ffff'));
        }

        if (typeof walls !== 'undefined') {
            for (let wall of walls) {
                if (wall.type === 'wall_hit') {
                    if (this.x > wall.x && this.x < wall.x + wall.w &&
                        this.y > wall.y && this.y < wall.y + wall.h) {
                        this.active = false;
                        break;
                    }
                }
            }
        }

        if (this.x < -150 || this.x > canvas.width + 150 || this.y < -150 || this.y > canvas.height + 150) {
            this.active = false;
        }
    }

    draw() {
        if (!this.active) return;
        ctx.save();

        if (this.bulletType === 'scissor') {
            let angle = Math.atan2(this.vy, this.vx);
            ctx.translate(this.x, this.y);
            ctx.rotate(angle);

            ctx.fillStyle = '#ffd700';
            ctx.beginPath(); ctx.ellipse(0, 0, 9, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#111111';
            ctx.fillRect(-2, -6, 3, 12);
            ctx.fillRect(3, -5, 2.5, 10);

            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
            ctx.beginPath(); ctx.ellipse(-2, -7, 4, 2, Math.PI / 4, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.ellipse(-2, 7, 4, 2, -Math.PI / 4, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#222';
            ctx.beginPath();
            ctx.moveTo(9, -2);
            ctx.lineTo(16, 0);
            ctx.lineTo(9, 2);
            ctx.closePath();
            ctx.fill();
        } else if (this.bulletType === 'sun') {
            ctx.fillStyle = '#ffff33';
            ctx.shadowBlur = 15; ctx.shadowColor = '#ffd700';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#ffa500'; ctx.lineWidth = 2; ctx.stroke();
        } else if (this.bulletType === 'water') {
            ctx.fillStyle = '#00bfff';
            ctx.shadowBlur = 12; ctx.shadowColor = '#1e90ff';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.beginPath(); ctx.arc(this.x - 2, this.y - 2, 3, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'bomb') {
            ctx.fillStyle = '#cc0000';
            ctx.shadowBlur = 12; ctx.shadowColor = '#ff0000';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffff00';
            ctx.fillRect(this.x - 2, this.y - this.radius - 3, 4, 4);
        } else if (this.bulletType === 'primal') {
            ctx.fillStyle = '#8b5a2b';
            ctx.shadowBlur = 8; ctx.shadowColor = '#5c3a21';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#cd853f';
            ctx.beginPath(); ctx.arc(this.x - 3, this.y - 3, this.radius * 0.4, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'defense') {
            ctx.fillStyle = '#d2a679';
            ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(this.x, this.y, this.radius + 2, this.radius - 1, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        } else if (this.bulletType === 'threepeater') {
            ctx.fillStyle = '#adff2f';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'electric') {
            ctx.fillStyle = '#ffffff';
            ctx.shadowBlur = 18; ctx.shadowColor = '#00ffff';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#00ffcc'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius + 3, 0, Math.PI * 2); ctx.stroke();
            ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)'; ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(this.x, this.y, 175, 0, Math.PI * 2); ctx.stroke();
        } else if (this.bulletType === 'poison') {
            ctx.fillStyle = '#9400d3';
            ctx.shadowBlur = 12; ctx.shadowColor = '#ba55d3';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#7cfc00';
            ctx.beginPath(); ctx.arc(this.x - 2, this.y - 2, 2.5, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'ice_block') {
            ctx.fillStyle = '#bbf5ff'; ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 2;
            ctx.shadowBlur = 15; ctx.shadowColor = '#00ffff';
            ctx.beginPath();
            ctx.moveTo(this.x, this.y - this.radius);
            ctx.lineTo(this.x + this.radius, this.y - this.radius * 0.3);
            ctx.lineTo(this.x + this.radius * 0.7, this.y + this.radius);
            ctx.lineTo(this.x - this.radius * 0.7, this.y + this.radius);
            ctx.lineTo(this.x - this.radius, this.y - this.radius * 0.3);
            ctx.closePath(); ctx.fill(); ctx.stroke();
        } else if (this.bulletType === 'ice') {
            ctx.fillStyle = '#5bebf7'; ctx.shadowBlur = 10; ctx.shadowColor = '#00e1ff';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'blue_fire') {
            ctx.fillStyle = '#00ffff'; ctx.shadowBlur = 15; ctx.shadowColor = '#00aaff';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        } else if (this.bulletType === 'fire') {
            ctx.fillStyle = '#ff3300'; ctx.shadowBlur = 12; ctx.shadowColor = '#ff6600';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.fillStyle = '#7cfc00'; ctx.shadowBlur = 6; ctx.shadowColor = '#32cd32';
            ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        }

        ctx.restore();
    }

    applyEffect(target) {
        if (target === this.owner) return;
        if (this.bulletType === 'electric') return;

        if (this.bulletType === 'scissor') {
            target.takeDamage(this.damage);
            let stunFrames = this.customStun || 9;
            target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', stunFrames, 0, 60);
            effects.push(new Explosion(this.x, this.y, 20, '#ffd700'));
            this.active = false;
            return;
        }

        if (this.bulletType === 'sun') {
            target.takeDamage(this.damage);
            if (this.owner && !this.owner.isDead) {
                this.owner.hp = Math.min(this.owner.maxHp, this.owner.hp + 1);
                effects.push(new DamageText(this.owner.x + 10, this.owner.y - 20, "+1 HP", '#ffd700'));
            }
            effects.push(new Explosion(this.x, this.y, 22, '#ffff00'));
            this.active = false;
            return;
        }

        if (this.bulletType === 'water') {
            target.takeDamage(this.damage);
            effects.push(new Explosion(this.x, this.y, 25, '#00bfff'));
            this.active = false;
            return;
        }

        if (this.bulletType === 'bomb') {
            target.takeDamage(this.damage);
            effects.push(new Explosion(this.x, this.y, 65, '#ff3300'));
            canvas.style.transform = `translate(${(Math.random()-0.5)*8}px, ${(Math.random()-0.5)*8}px)`;
            setTimeout(() => canvas.style.transform = 'none', 80);
            this.active = false;
            return;
        }

        if (this.bulletType === 'primal') {
            target.takeDamage(this.damage);
            target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 15, 0, 60);
            effects.push(new Explosion(this.x, this.y, 30, '#8b5a2b'));
            this.active = false;
            return;
        }

        if (this.bulletType === 'poison') {
            target.removeStatus('shield');
            if (target.shield && target.shield.layers) target.shield.layers = 0;
            let currentStacks = target.getStatusValue('mgpea_poison_stack') || 0;
            let hitDmg = 5 + (currentStacks * 2);
            target.takeDamage(hitDmg);
            let newStacks = Math.min(5, currentStacks + 1);
            target.addStatus('mgpea_poison_stack', 'debuff', 'assets/icon/debuff/poison.png', 120, newStacks, 60);
            target.addStatus('poison', 'debuff', 'assets/icon/debuff/poison.png', 300, 2, 60);
            effects.push(new Explosion(this.x, this.y, 25, '#9400d3'));
            this.active = false;
            return;
        }

        target.takeDamage(this.damage);

        if (this.bulletType === 'ice_block') {
            target.addStatus('stuncc', 'debuff', 'assets/icon/debuff/stuncc.png', 300, 0, 60);
            effects.push(new Explosion(this.x, this.y, 45, '#00ffff'));
        } else if (this.bulletType === 'ice') {
            target.addStatus('snowless', 'debuff', 'assets/icon/debuff/snowless.png', 300, 50, 60);
            target.addStatus('freeze', 'debuff', 'assets/icon/debuff/freeze.png', 300, 50, 60);
            effects.push(new Explosion(this.x, this.y, 22, '#5bebf7'));
        } else if (this.bulletType === 'blue_fire') {
            effects.push(new Explosion(this.x, this.y, 35, '#00ffff'));
            target.addStatus('flame', 'debuff', 'assets/icon/debuff/flame.png', 120, 2, 30);
        } else if (this.bulletType === 'fire') {
            effects.push(new Explosion(this.x, this.y, 25, '#ff4500'));
            target.addStatus('flame', 'debuff', 'assets/icon/debuff/flame.png', 60, 1, 30);
        } else {
            effects.push(new Explosion(this.x, this.y, 16, '#7cfc00'));
        }

        this.active = false;
    }
}

// --- KHỞI TẠO BIẾN THUỘC TÍNH CHO MEGA GATLING PEA ---
Player.prototype.initMegaGatlingPea = function() {
    if (this.heroType === 'mgpea' && !this.mgpeaInitialized) {
        this.mgpeaInitialized = true;
        this.mgpeaEnhancedShots = 0;
        this.mgpeaForcePassive = false;
        this.mgpeaForm = null;          
        this.mgpeaFormTimer = 0;        
        this.mgpeaNextIsFive = false;   
        this.mgpeaGatlingActive = false;
        this.mgpeaGatlingTimer = 0;     
        this.mgpeaGatlingCount = 0;     
        this.mgpeaMuzzleAnim = 0;       
        this.mgpeaPeanutTopTurn = true;
        this.isFixedMgpeaForm = false;

        this.maxCds = { c1: 480, c2: 600, c3: 600 };

        // XỬ LÝ KHÓA DẠNG CỐ ĐỊNH NẾU ĐƯỢC CHỌN
        if (this.fixedMgpeaForm && this.fixedMgpeaForm !== 'default') {
            this.isFixedMgpeaForm = true;
            this.mgpeaForm = this.fixedMgpeaForm;
            this.mgpeaFormTimer = 999999;
            this.cds.c1 = 999999;
            this.cds.c3 = 999999;

            if (this.fixedMgpeaForm === 'defense') {
                this.addStatus('bhshield', 'buff', 'assets/icon/buff/hshield.png', 999999, this.hp, 60);
                this.boomShield = this.hp;
            }
        }
    }
};

// --- LOGIC CẬP NHẬT TRẠNG THÁI LIÊN TỤC CỦA MEGA GATLING PEA ---
const originalMgPeaUpdate = Player.prototype.update;
Player.prototype.update = function() {
    this.initMegaGatlingPea();

    if (this.heroType === 'mgpea' && !this.isDead) {
        if (this.mgpeaMuzzleAnim > 0) this.mgpeaMuzzleAnim--;

        if (this.mgpeaForm) {
            if (this.isFixedMgpeaForm) {
                this.mgpeaFormTimer = 999999;
                this.cds.c1 = 999999;
                this.cds.c3 = 999999;
            } else {
                this.mgpeaFormTimer--;
                if (this.mgpeaFormTimer <= 0) {
                    this.mgpeaForm = null;
                    this.cds.c3 = 600;
                    this.removeStatus('mgpea_form_status');
                }
            }

            if (this.mgpeaForm === 'fire') {
                if (Math.random() < 0.4) {
                    effects.push(new FireParticle(
                        this.x + Math.random() * this.width, this.y + Math.random() * this.height,
                        (Math.random() - 0.5) * 1.5, -Math.random() * 2 - 1, 5, 18,
                        Math.random() < 0.2 ? '#00ffff' : '#ff4500'
                    ));
                }
            } else if (this.mgpeaForm === 'ice') {
                if (Math.random() < 0.3) {
                    effects.push(new RockParticle(
                        this.x + Math.random() * this.width, this.y + Math.random() * this.height,
                        (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, '#00ffff'
                    ));
                }
            } else if (this.mgpeaForm === 'electric') {
                if (Math.random() < 0.25) {
                    effects.push(new LightningZap(
                        this.x + Math.random() * this.width, this.y + Math.random() * this.height,
                        this.x + Math.random() * this.width + (Math.random() - 0.5) * 30, this.y + (Math.random() - 0.5) * 30,
                        '#00ffff'
                    ));
                }
            } else if (this.mgpeaForm === 'poison') {
                if (Math.random() < 0.3) {
                    effects.push(new Explosion(
                        this.x + Math.random() * this.width, this.y + this.height + (Math.random() - 0.5) * 6,
                        6, 'rgba(148, 0, 211, 0.6)'
                    ));
                }
            } else if (this.mgpeaForm === 'sun') {
                if (Math.random() < 0.35) {
                    effects.push(new FireParticle(
                        this.x + Math.random() * this.width, this.y + Math.random() * this.height,
                        (Math.random() - 0.5) * 2, -Math.random() * 2, 4, 15, '#ffd700'
                    ));
                }
            } else if (this.mgpeaForm === 'water') {
                if (Math.random() < 0.35) {
                    effects.push(new RockParticle(
                        this.x + Math.random() * this.width, this.y + this.height,
                        (Math.random() - 0.5) * 2, -Math.random() * 2, '#00bfff'
                    ));
                }
            }
        }

        // XỬ LÝ BẮN NỘI TẠI GATLING
        if (this.mgpeaGatlingActive) {
            this.mgpeaGatlingTimer++;

            this.vx = 0; this.vy = 0;
            this.isInvincible = true;
            this.addStatus('ironbody', 'buff', 'assets/icon/buff/ironbody.png', 10, 0, 60);
            this.mgpeaMuzzleAnim = 10;

            if (this.mgpeaForm === 'defense') {
                let maxWallNuts = 6;
                let targetShots = Math.floor((this.mgpeaGatlingTimer / 135) * maxWallNuts);

                while (this.mgpeaGatlingCount < targetShots && this.mgpeaGatlingCount < maxWallNuts) {
                    this.mgpeaGatlingCount++;

                    let spawnX = this.facingRight ? this.x + this.width + 40 : this.x - 40;
                    let spawnY = this.y + 20;

                    let spreadAngle = getParabolicSpreadAngle(15);
                    let baseAngle = this.facingRight ? 0 : Math.PI;
                    let finalAngle = baseAngle + spreadAngle;

                    let speed = 7 + Math.random() * 2;
                    let vx = Math.cos(finalAngle) * speed;
                    let vy = Math.sin(finalAngle) * speed;

                    projectiles.push(new RollingWallNut(spawnX, spawnY, vx, vy, this));
                }
            } 
            else if (this.mgpeaForm === 'pod') {
                if (this.mgpeaGatlingTimer === 10 || this.mgpeaGatlingTimer === 50 || this.mgpeaGatlingTimer === 90) {
                    projectiles.push(new PeaPodVolleySpawner(this, 40, 75));
                    effects.push(new Explosion(this.x + this.width / 2, this.y - 10, 50, '#adff2f'));
                }
            } 
            else if (this.mgpeaForm === 'water') {
                let maxWaves = 60;
                let targetWaves = Math.floor((this.mgpeaGatlingTimer / 135) * maxWaves);

                while (this.mgpeaGatlingCount < targetWaves && this.mgpeaGatlingCount < maxWaves) {
                    this.mgpeaGatlingCount++;

                    let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
                    let spawnY = this.y + 16;
                    let baseAngle = this.facingRight ? 0 : Math.PI;
                    let mainAngles = [-15, 0, 15];

                    for (let mainDeg of mainAngles) {
                        let devAngle = getParabolicSpreadAngle(15);
                        let finalAngle = baseAngle + ((mainDeg * Math.PI / 180) + devAngle);

                        let speed = 25 + Math.random() * 4;
                        let vx = Math.cos(finalAngle) * speed;
                        let vy = Math.sin(finalAngle) * speed;

                        projectiles.push(new MegaGatlingPeaBullet(spawnX, spawnY, vx, vy, this, 'water'));
                    }
                }
            }
            else if (this.mgpeaForm === 'scissor') {
                let maxBees = 60;
                let targetShots = Math.floor((this.mgpeaGatlingTimer / 135) * maxBees);

                while (this.mgpeaGatlingCount < targetShots && this.mgpeaGatlingCount < maxBees) {
                    this.mgpeaGatlingCount++;

                    let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
                    let spawnY = this.y + 16;

                    let spreadAngle = getParabolicSpreadAngle(15);
                    let baseAngle = this.facingRight ? 0 : Math.PI;
                    let finalAngle = baseAngle + spreadAngle;

                    let speed = 32 + Math.random() * 5;
                    let vx = Math.cos(finalAngle) * speed;
                    let vy = Math.sin(finalAngle) * speed;

                    projectiles.push(new MegaGatlingPeaBullet(spawnX, spawnY, vx, vy, this, 'scissor', 90));
                }
            }
            else if (this.mgpeaForm === 'sun') {
                let maxSunGatling = 60;
                let targetShots = Math.floor((this.mgpeaGatlingTimer / 135) * maxSunGatling);

                while (this.mgpeaGatlingCount < targetShots && this.mgpeaGatlingCount < maxSunGatling) {
                    this.mgpeaGatlingCount++;

                    let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
                    let spawnY = this.y + 16;

                    let spreadAngle = getParabolicSpreadAngle(18);
                    let baseAngle = this.facingRight ? 0 : Math.PI;
                    let finalAngle = baseAngle + spreadAngle;

                    if (Math.random() < 0.15) {
                        projectiles.push(new SolarLaserBeam(spawnX, spawnY, finalAngle, this));
                    } else {
                        let speed = 24 + Math.random() * 4;
                        let vx = Math.cos(finalAngle) * speed;
                        let vy = Math.sin(finalAngle) * speed;
                        projectiles.push(new MegaGatlingPeaBullet(spawnX, spawnY, vx, vy, this, 'sun'));
                    }
                }
            }
            else {
                let maxGatlingBullets = (this.mgpeaForm === 'threepeater') ? 180 : 60;
                let targetShots = Math.floor((this.mgpeaGatlingTimer / 135) * maxGatlingBullets);

                while (this.mgpeaGatlingCount < targetShots && this.mgpeaGatlingCount < maxGatlingBullets) {
                    this.mgpeaGatlingCount++;

                    let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
                    let spawnY = this.y + 16;

                    let spreadAngle = getParabolicSpreadAngle(20);
                    let baseAngle = this.facingRight ? 0 : Math.PI;
                    let finalAngle = baseAngle + spreadAngle;

                    let speed = (this.mgpeaForm === 'electric') ? (13 + Math.random() * 2) : (24 + Math.random() * 4);
                    let vx = Math.cos(finalAngle) * speed;
                    let vy = Math.sin(finalAngle) * speed;

                    let bType = 'normal';
                    if (this.mgpeaForm === 'bomb') bType = 'bomb';
                    else if (this.mgpeaForm === 'primal') bType = 'primal';
                    else if (this.mgpeaForm === 'threepeater') bType = 'threepeater';
                    else if (this.mgpeaForm === 'electric') bType = 'electric';
                    else if (this.mgpeaForm === 'poison') bType = 'poison';
                    else if (this.mgpeaForm === 'ice') bType = (Math.random() < 0.05) ? 'ice_block' : 'ice';
                    else if (this.mgpeaForm === 'fire' || this.mgpeaEnhancedShots > 0) {
                        bType = (this.mgpeaForm === 'fire' && Math.random() < 0.15) ? 'blue_fire' : 'fire';
                    }

                    projectiles.push(new MegaGatlingPeaBullet(spawnX, spawnY, vx, vy, this, bType));
                }
            }

            if (this.mgpeaGatlingTimer >= 135) {
                this.mgpeaGatlingActive = false;
                this.isInvincible = false;
                this.mgpeaNextIsFive = true;
            }
        }
    }

    originalMgPeaUpdate.apply(this, arguments);
};

// --- LOGIC THỰC THI CHIÊU THỨC MEGA GATLING PEA ---
Player.prototype.executeMegaGatlingPeaSkill = function(skillKey) {
    let dir = this.facingRight ? 1 : -1;

    if (skillKey === 'basic') {
        let isPassiveProc = (this.mgpeaForcePassive || (Math.random() < 0.05));

        if (isPassiveProc) {
            this.mgpeaForcePassive = false;
            this.mgpeaGatlingActive = true;
            this.mgpeaGatlingTimer = 0;
            this.mgpeaGatlingCount = 0;
            this.mgpeaMuzzleAnim = 135;
            this.removeStatus('mgpea_c2_ready');

            playSkillSound('assets/sounds/sound_skill/mgpea/basent.ogg');
            return;
        }

        playSkillSound('assets/sounds/sound_skill/mgpea/base.ogg');

        if (this.mgpeaForm === 'scissor') {
            this.mgpeaMuzzleAnim = 20;
            let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
            let spawnY = this.y + 16;

            for (let i = 0; i < 4; i++) {
                let posX = spawnX - (i * dir * 12);
                projectiles.push(new MegaGatlingPeaBullet(posX, spawnY, dir * 30, 0, this, 'scissor', 9));
            }
            this.x -= dir * 3;
            return;
        }

        if (this.mgpeaForm === 'sun') {
            this.mgpeaMuzzleAnim = 20;
            let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
            let spawnY = this.y + 16;

            let isLaser = (Math.random() < 0.10);
            if (isLaser) {
                let baseAngle = this.facingRight ? 0 : Math.PI;
                projectiles.push(new SolarLaserBeam(spawnX, spawnY, baseAngle, this));
            } else {
                for (let i = 0; i < 4; i++) {
                    let posX = spawnX - (i * dir * 10);
                    projectiles.push(new MegaGatlingPeaBullet(posX, spawnY, dir * 24, 0, this, 'sun'));
                }
            }
            this.x -= dir * 3;
            return;
        }

        if (this.mgpeaForm === 'water') {
            this.mgpeaMuzzleAnim = 20;
            let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
            let spawnY = this.y + 16;

            let angles = [0, 15 * Math.PI / 180, -15 * Math.PI / 180];
            let baseAngle = this.facingRight ? 0 : Math.PI;

            for (let deg of angles) {
                let finalAngle = baseAngle + (this.facingRight ? deg : -deg);
                for (let i = 0; i < 4; i++) {
                    let posX = spawnX - (i * dir * 8);
                    let speed = 24;
                    let vx = Math.cos(finalAngle) * speed;
                    let vy = Math.sin(finalAngle) * speed;
                    projectiles.push(new MegaGatlingPeaBullet(posX, spawnY, vx, vy, this, 'water'));
                }
            }
            this.x -= dir * 4;
            return;
        }

        if (this.mgpeaForm === 'pod') {
            this.mgpeaMuzzleAnim = 25;
            projectiles.push(new PeaPodVolleySpawner(this, 20, 80));
            effects.push(new Explosion(this.x + this.width / 2, this.y - 10, 40, '#adff2f'));
            return;
        }

        if (this.mgpeaForm === 'defense') {
            this.mgpeaMuzzleAnim = 20;
            let isLowHp = (this.hp < this.maxHp * 0.5);

            let shootFromTop = false;
            if (isLowHp) {
                shootFromTop = false;
            } else {
                if (this.mgpeaPeanutTopTurn === undefined) this.mgpeaPeanutTopTurn = true;
                shootFromTop = this.mgpeaPeanutTopTurn;
                this.mgpeaPeanutTopTurn = !this.mgpeaPeanutTopTurn;
            }

            let spawnY = shootFromTop ? (this.y + 6) : (this.y + 26);
            let spawnX = this.facingRight ? this.x + this.width + 12 : this.x - 12;

            for (let i = 0; i < 4; i++) {
                let posX = spawnX - (i * dir * 10);
                projectiles.push(new MegaGatlingPeaBullet(posX, spawnY, dir * 22, 0, this, 'defense'));
            }
            this.x -= dir * 2;
            return;
        }

        if (this.mgpeaForm === 'threepeater') {
            this.mgpeaMuzzleAnim = 20;
            let headsY = [this.y + 4, this.y + 16, this.y + 28];

            for (let i = 0; i < 12; i++) {
                let headIndex = i % 3;
                let spawnY = headsY[headIndex];
                let spawnX = (this.facingRight ? this.x + this.width + 15 : this.x - 15) - Math.floor(i / 3) * dir * 8;

                let spreadAngle = getParabolicSpreadAngle(5);
                let baseAngle = this.facingRight ? 0 : Math.PI;
                let finalAngle = baseAngle + spreadAngle;

                let speed = 22 + Math.random() * 3;
                projectiles.push(new MegaGatlingPeaBullet(spawnX, spawnY, Math.cos(finalAngle) * speed, Math.sin(finalAngle) * speed, this, 'threepeater'));
            }
            this.x -= dir * 4;
            return;
        }

        let peaCount = this.mgpeaNextIsFive ? 5 : 4;
        this.mgpeaNextIsFive = false;
        this.mgpeaMuzzleAnim = 20;

        let spawnX = this.facingRight ? this.x + this.width + 16 : this.x - 16;
        let spawnY = this.y + 16;
        let speed = (this.mgpeaForm === 'electric') ? 14 : 23;

        let isEnhanced = (this.mgpeaEnhancedShots > 0);
        if (isEnhanced && !this.mgpeaForm) {
            this.mgpeaEnhancedShots--;
            if (this.mgpeaEnhancedShots <= 0) {
                this.removeStatus('flame');
            }
        }

        for (let i = 0; i < peaCount; i++) {
            let posX = spawnX - (i * dir * 10);
            let bType = 'normal';

            if (this.mgpeaForm === 'bomb') bType = 'bomb';
            else if (this.mgpeaForm === 'primal') bType = 'primal';
            else if (this.mgpeaForm === 'electric') bType = 'electric';
            else if (this.mgpeaForm === 'poison') bType = 'poison';
            else if (this.mgpeaForm === 'ice') bType = (Math.random() < 0.05) ? 'ice_block' : 'ice';
            else if (this.mgpeaForm === 'fire' || isEnhanced) {
                bType = (this.mgpeaForm === 'fire' && Math.random() < 0.15) ? 'blue_fire' : 'fire';
            }

            projectiles.push(new MegaGatlingPeaBullet(posX, spawnY, dir * speed, 0, this, bType));
        }

        this.x -= dir * 3;
    }
    else if (skillKey === 'c1') {
        if (this.mgpeaForm || this.isFixedMgpeaForm) return;
        this.mgpeaEnhancedShots = 3;
        this.addStatus('flame', 'buff', 'assets/icon/debuff/flame.png', 'inf', 3, 60);
        effects.push(new Explosion(this.x + 15, this.y + 25, 40, '#ff4500'));
    }
    else if (skillKey === 'c2') {
        this.mgpeaForcePassive = true;
        this.addStatus('mgpea_c2_ready', 'buff', 'assets/icon/buff/hasteatk.png', 'inf', 1, 60);
        effects.push(new Explosion(this.x + 15, this.y + 25, 35, '#7cfc00'));
    }
    else if (skillKey === 'c3') {
        if (this.isFixedMgpeaForm) return;

        let formPool = ['fire', 'ice', 'electric', 'poison', 'defense', 'primal', 'threepeater', 'bomb', 'pod', 'scissor', 'sun', 'water'];
        let chosenForm = formPool[Math.floor(Math.random() * formPool.length)];

        this.mgpeaForm = chosenForm;
        this.mgpeaFormTimer = 600;
        this.cds.c3 = 999999;
        this.mgpeaPeanutTopTurn = true;

        if (chosenForm === 'scissor') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#333333'));
        } else if (chosenForm === 'sun') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#ffd700'));
        } else if (chosenForm === 'water') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#00bfff'));
        } else if (chosenForm === 'defense') {
            this.addStatus('bhshield', 'buff', 'assets/icon/buff/hshield.png', 600, this.hp, 60);
            this.boomShield = this.hp;
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#d2a679'));
        } else if (chosenForm === 'pod') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#adff2f'));
        } else if (chosenForm === 'bomb') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#ff0000'));
        } else if (chosenForm === 'primal') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#8b5a2b'));
        } else if (chosenForm === 'threepeater') {
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#adff2f'));
        } else if (chosenForm === 'fire') {
            playSkillSound('assets/sounds/sound_skill/mgpea/fire.ogg');
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#ff3300'));
        } else if (chosenForm === 'ice') {
            playSkillSound('assets/sounds/sound_skill/mgpea/ice.ogg');
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#00ffff'));
        } else if (chosenForm === 'electric') {
            playSkillSound('assets/sounds/sound_skill/mgpea/electric.ogg');
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#00ffcc'));
        } else if (chosenForm === 'poison') {
            playSkillSound('assets/sounds/sound_skill/mgpea/poison.ogg');
            effects.push(new Explosion(this.x + 15, this.y + 25, 80, '#9400d3'));
        }

        canvas.style.transform = `translate(${(Math.random() - 0.5) * 10}px, ${(Math.random() - 0.5) * 10}px)`;
        setTimeout(() => canvas.style.transform = 'none', 120);
    }
};

// --- GHI ĐÈ KÍCH HOẠT KỸ NĂNG VÀ HỒI CHIÊU ---
const originalMgPeaTriggerSkill = Player.prototype.triggerSkill;
Player.prototype.triggerSkill = function(skillKey) {
    if (this.heroType === 'mgpea') {
        if (this.isSilenced || this.hasStatus('stuncc')) {
            this.stopHeroVoice();
            return;
        }

        // CẤM C1 VÀ C3 NẾU ĐANG Ở DẠNG CỐ ĐỊNH
        if (this.isFixedMgpeaForm && (skillKey === 'c1' || skillKey === 'c3')) {
            effects.push(new DamageText(this.x, this.y - 20, "Bị Khóa!", '#ff3333'));
            return;
        }

        if (skillKey === 'basic' && !this.mgpeaGatlingActive) {
            this.executeMegaGatlingPeaSkill('basic');

            if (this.mgpeaForm === 'bomb' || this.mgpeaForm === 'pod') {
                this.cds.basic = 90;
            } else if (this.mgpeaForm === 'defense') {
                let isLowHp = (this.hp < this.maxHp * 0.5);
                this.cds.basic = isLowHp ? 72 : 36;
            } else {
                this.cds.basic = 45;
            }
        } else if (skillKey === 'c1' && this.cds.c1 <= 0 && !this.mgpeaGatlingActive) {
            if (this.mgpeaForm || this.isFixedMgpeaForm) return;
            this.executeMegaGatlingPeaSkill('c1');
            this.cds.c1 = 480;
        } else if (skillKey === 'c2' && this.cds.c2 <= 0 && !this.mgpeaGatlingActive) {
            this.executeMegaGatlingPeaSkill('c2');
            this.cds.c2 = 600;
        } else if (skillKey === 'c3' && this.cds.c3 <= 0 && !this.mgpeaForm && !this.mgpeaGatlingActive) {
            if (this.isFixedMgpeaForm) return;
            this.executeMegaGatlingPeaSkill('c3');
        }
    } else {
        originalMgPeaTriggerSkill.apply(this, arguments);
    }
};

// --- VẼ CANVAS CHO MEGA GATLING PEA (FULL 12 DẠNG) ---
const originalMgPeaDraw = Player.prototype.draw;
Player.prototype.draw = function() {
    if (this.heroType === 'mgpea') {
        ctx.save();
        let cx = this.x + this.width / 2;
        let cy = this.y + this.height / 2;
        let dir = this.facingRight ? 1 : -1;
        let isShooting = (this.mgpeaMuzzleAnim > 0 || this.mgpeaGatlingActive);

        // 1. DẠNG KÉO CẮT / ONG GAI (SCISSOR)
        if (this.mgpeaForm === 'scissor') {
            ctx.fillStyle = '#228b22'; ctx.fillRect(cx - 3, cy + 5, 6, this.height / 2 - 5);
            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx - 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.ellipse(cx + 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffd700';
            ctx.beginPath(); ctx.arc(cx, this.y + 16, 17, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#111111';
            ctx.beginPath(); ctx.moveTo(cx - 14, this.y + 26); ctx.lineTo(cx + 14, this.y + 26); ctx.lineTo(cx, this.y + 36); ctx.closePath(); ctx.fill();

            let mouthX = this.facingRight ? cx + 12 : cx - 22;
            let mouthY = this.y + 10;
            ctx.fillStyle = '#e6c200';
            ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 8 : 2), mouthY + 7, 7, 9, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#111';
            ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 9 : 1), mouthY + 7, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffffff';
            let eyeX = this.facingRight ? cx + 2 : cx - 10;
            ctx.beginPath(); ctx.ellipse(eyeX, this.y + 11, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath(); ctx.arc(eyeX + (this.facingRight ? 1.5 : -1.5), this.y + 11, 2.5, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#111111';
            let paintX = this.facingRight ? cx + 6 : cx - 12;
            ctx.fillRect(paintX, this.y + 19, 7, 2.5);

            ctx.fillStyle = '#3a3a3a';
            ctx.beginPath(); ctx.arc(cx - dir * 2, this.y + 6, 19, Math.PI, 0); ctx.fill();
            ctx.fillStyle = '#222'; ctx.fillRect(cx - 21, this.y + 4, 40, 4);

            ctx.fillStyle = '#222222'; ctx.strokeStyle = '#666'; ctx.lineWidth = 1;
            let spikeAngles = [-Math.PI * 0.8, -Math.PI * 0.5, -Math.PI * 0.2];
            for (let sa of spikeAngles) {
                let sx = cx - dir * 2 + Math.cos(sa) * 19;
                let sy = this.y + 6 + Math.sin(sa) * 19;
                ctx.beginPath();
                ctx.moveTo(sx - 4, sy);
                ctx.lineTo(sx + Math.cos(sa) * 12, sy + Math.sin(sa) * 12);
                ctx.lineTo(sx + 4, sy);
                ctx.closePath();
                ctx.fill(); ctx.stroke();
            }

            ctx.fillStyle = '#cccccc';
            ctx.beginPath();
            ctx.moveTo(cx - 6, this.y - 4); ctx.lineTo(cx, this.y - 12); ctx.lineTo(cx + 6, this.y - 4); ctx.lineTo(cx, this.y - 7);
            ctx.closePath(); ctx.fill();

            if (isShooting) {
                let gunX = this.facingRight ? mouthX + 6 : mouthX - 10;
                ctx.fillStyle = '#ffcc00'; ctx.shadowBlur = 12; ctx.shadowColor = '#ffcc00';
                ctx.beginPath(); ctx.arc(gunX + dir * 16, mouthY + 7, 7 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
            return;
        }

        // 2. DẠNG MẶT TRỜI (SUN)
        if (this.mgpeaForm === 'sun') {
            ctx.save();
            ctx.translate(cx, this.y + 12);
            ctx.rotate(Date.now() / 800);
            ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2; ctx.shadowBlur = 15; ctx.shadowColor = '#ffd700';
            ctx.beginPath(); ctx.arc(0, 0, 26, 0, Math.PI * 2); ctx.stroke();
            for (let i = 0; i < 8; i++) {
                ctx.rotate(Math.PI / 4);
                ctx.beginPath(); ctx.moveTo(26, 0); ctx.lineTo(34, 0); ctx.stroke();
            }
            ctx.restore();

            ctx.fillStyle = '#228b22'; ctx.fillRect(cx - 3, cy + 5, 6, this.height / 2 - 5);
            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx - 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.ellipse(cx + 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffff66';
            ctx.shadowBlur = 15; ctx.shadowColor = '#ffd700';
            ctx.beginPath(); ctx.arc(cx, this.y + 16, 17, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            let mouthX = this.facingRight ? cx + 12 : cx - 22;
            let mouthY = this.y + 10;
            ctx.fillStyle = '#ffd700';
            ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 8 : 2), mouthY + 7, 7, 9, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 9 : 1), mouthY + 7, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffffff';
            let eyeX = this.facingRight ? cx + 2 : cx - 10;
            ctx.beginPath(); ctx.ellipse(eyeX, this.y + 11, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#ffd700'; ctx.shadowBlur = 8; ctx.shadowColor = '#ffd700';
            ctx.beginPath(); ctx.arc(eyeX + (this.facingRight ? 1.5 : -1.5), this.y + 11, 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.shadowBlur = 0;

            ctx.fillStyle = '#102830';
            ctx.beginPath(); ctx.arc(cx - dir * 2, this.y + 6, 19, Math.PI, 0); ctx.fill();
            ctx.fillStyle = '#0a1a20'; ctx.fillRect(cx - 21, this.y + 4, 40, 4);

            ctx.strokeStyle = '#111'; ctx.lineWidth = 2.5;
            ctx.beginPath(); ctx.arc(cx - dir * 2, this.y + 16, 17, Math.PI * 0.2, Math.PI * 0.8); ctx.stroke();

            ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 2.5;
            let chevX = this.facingRight ? cx - 3 : cx + 3;
            for (let v = 0; v < 3; v++) {
                ctx.beginPath(); ctx.moveTo(chevX - 6, this.y - 6 + v * 4); ctx.lineTo(chevX, this.y - 10 + v * 4); ctx.lineTo(chevX + 6, this.y - 6 + v * 4); ctx.stroke();
            }

            ctx.fillStyle = '#ffd700'; ctx.font = 'bold 9px Arial';
            let starOffset = this.facingRight ? -14 : 7;
            ctx.fillText('★', cx + starOffset, this.y - 2);
            ctx.font = 'bold 7px Arial';
            ctx.fillText('★', cx + starOffset + (this.facingRight ? -5 : 7), this.y + 3);
            ctx.fillText('★', cx + starOffset + (this.facingRight ? 5 : -7), this.y + 3);

            if (isShooting) {
                let gunX = this.facingRight ? mouthX + 6 : mouthX - 10;
                ctx.fillStyle = '#ffff33'; ctx.shadowBlur = 15; ctx.shadowColor = '#ffd700';
                ctx.beginPath(); ctx.arc(gunX + dir * 16, mouthY + 7, 8 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
            return;
        }

        // 3. DẠNG NƯỚC (WATER)
        if (this.mgpeaForm === 'water') {
            ctx.fillStyle = 'rgba(0, 191, 255, 0.4)';
            ctx.beginPath(); ctx.ellipse(cx, this.y + this.height - 2, 22, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.strokeStyle = '#00ffff'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.ellipse(cx, this.y + this.height - 2, 26, 7, 0, 0, Math.PI * 2); ctx.stroke();

            ctx.strokeStyle = '#2e8b57'; ctx.lineWidth = 6; ctx.lineCap = 'round';
            ctx.beginPath(); ctx.moveTo(cx, this.y + this.height - 4); ctx.quadraticCurveTo(cx - dir * 10, cy + 10, cx - dir * 4, this.y + 18); ctx.stroke();

            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx - dir * 8, cy + 12, 8, 4, Math.PI / 4, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#8a2be2'; ctx.strokeStyle = '#ba55d3'; ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx - dir * 20, this.y + 2);
            ctx.quadraticCurveTo(cx - dir * 28, this.y + 35, cx + dir * 8, this.y + 32);
            ctx.quadraticCurveTo(cx + dir * 18, this.y + 8, cx - dir * 4, this.y + 2);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            let peaHeads = [
                { x: cx - dir * 6, y: this.y + 10 },
                { x: cx + dir * 4, y: this.y + 14 },
                { x: cx - dir * 2, y: this.y + 22 }
            ];

            for (let ph of peaHeads) {
                ctx.fillStyle = '#7cfc00';
                ctx.beginPath(); ctx.arc(ph.x, ph.y, 8, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#228b22';
                ctx.beginPath(); ctx.ellipse(ph.x + dir * 6, ph.y + 1, 3, 4, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#fff';
                ctx.beginPath(); ctx.arc(ph.x + dir * 2, ph.y - 2, 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath(); ctx.arc(ph.x + dir * 2.5, ph.y - 2, 1, 0, Math.PI * 2); ctx.fill();
            }

            ctx.fillStyle = '#102830';
            ctx.beginPath(); ctx.arc(cx - dir * 6, this.y + 2, 18, Math.PI, 0); ctx.fill();
            ctx.fillStyle = '#0a1a20'; ctx.fillRect(cx - dir * 6 - 20, this.y + 1, 40, 3);
            ctx.strokeStyle = '#00bfff'; ctx.lineWidth = 2;
            ctx.beginPath(); ctx.moveTo(cx - dir * 6 - 4, this.y - 5); ctx.lineTo(cx - dir * 6, this.y - 9); ctx.lineTo(cx - dir * 6 + 4, this.y - 5); ctx.stroke();

            if (isShooting) {
                let gunX = cx + dir * 12;
                ctx.fillStyle = '#00bfff'; ctx.shadowBlur = 12; ctx.shadowColor = '#00ffff';
                ctx.beginPath(); ctx.arc(gunX, this.y + 16, 7 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
            return;
        }

        // 4. DẠNG PHÁO ĐẬU (PEA POD)
        if (this.mgpeaForm === 'pod') {
            ctx.fillStyle = '#2e8b57';
            ctx.beginPath();
            ctx.ellipse(cx - 10, this.y + this.height - 2, 12, 5, 0, 0, Math.PI * 2);
            ctx.ellipse(cx + 10, this.y + this.height - 2, 12, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.fillStyle = '#1e7822';
            ctx.strokeStyle = '#0e4a13';
            ctx.lineWidth = 2.5;
            ctx.beginPath();
            ctx.moveTo(cx - dir * 18, this.y + 12);
            ctx.quadraticCurveTo(cx - dir * 25, this.y + 45, cx + dir * 18, this.y + 40);
            ctx.quadraticCurveTo(cx + dir * 22, this.y + 20, cx + dir * 8, this.y + 24);
            ctx.quadraticCurveTo(cx - dir * 2, this.y + 40, cx - dir * 18, this.y + 12);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();

            let reloadRatio = Math.max(0, 1 - (this.cds.basic / 90));
            let peasCount = isShooting ? 1 : (reloadRatio >= 0.9 ? 5 : (reloadRatio >= 0.65 ? 4 : (reloadRatio >= 0.4 ? 3 : (reloadRatio >= 0.15 ? 2 : 1))));

            let podPeasPos = [
                { x: cx - dir * 12, y: this.y + 20, r: 8 },
                { x: cx - dir * 5, y: this.y + 25, r: 8.5 },
                { x: cx + dir * 2, y: this.y + 28, r: 8.5 },
                { x: cx + dir * 9, y: this.y + 26, r: 8.5 },
                { x: cx + dir * 14, y: this.y + 18, r: 9 }
            ];

            for (let i = 0; i < peasCount; i++) {
                let p = podPeasPos[i];
                ctx.fillStyle = '#7cfc00';
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(p.x - 2, p.y - 2, p.r * 0.35, 0, Math.PI * 2); ctx.fill();
            }

            let headPea = podPeasPos[podPeasPos.length - 1];
            ctx.fillStyle = '#66cd00';
            ctx.beginPath(); ctx.arc(headPea.x, headPea.y - 2, 10, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.ellipse(headPea.x + dir * 2, headPea.y - 4, 3.5, 4.5, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath(); ctx.arc(headPea.x + dir * 2, headPea.y - 5, 2, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#102830';
            ctx.beginPath(); ctx.arc(headPea.x, headPea.y - 8, 12, Math.PI, 0); ctx.fill();
            ctx.fillStyle = '#0a1a20';
            ctx.fillRect(headPea.x - 14, headPea.y - 9, 28, 3);
            ctx.fillStyle = '#ffd700'; ctx.font = 'bold 7px Arial';
            ctx.fillText('★', headPea.x - 3, headPea.y - 12);

            if (isShooting) {
                let gunX = headPea.x;
                let gunY = headPea.y - 11;
                ctx.fillStyle = '#333333';
                ctx.fillRect(gunX - 5, gunY, 3, -12);
                ctx.fillRect(gunX - 1.5, gunY, 3, -14);
                ctx.fillRect(gunX + 2, gunY, 3, -12);

                ctx.fillStyle = '#ff6600';
                ctx.fillRect(gunX - 5, gunY - 11, 3, -2);
                ctx.fillRect(gunX - 1.5, gunY - 13, 3, -2);
                ctx.fillRect(gunX + 2, gunY - 11, 3, -2);

                ctx.fillStyle = '#ffcc00';
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#ffcc00';
                ctx.beginPath();
                ctx.arc(gunX, gunY - 16, 6 + Math.random() * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
            return;
        }

        // 5. DẠNG PHÒNG THỦ (PEANUT)
        if (this.mgpeaForm === 'defense') {
            let isLowHp = (this.hp < this.maxHp * 0.5);

            ctx.fillStyle = '#d2a679'; ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 2;

            ctx.beginPath(); ctx.arc(cx, this.y + 32, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#102830';
            ctx.beginPath(); ctx.arc(cx, this.y + 40, 17, 0, Math.PI); ctx.fill();
            ctx.fillStyle = '#ffa500'; ctx.font = 'bold 8px Arial';
            ctx.fillText('★', cx - 6, this.y + 46); ctx.fillText('★', cx + 2, this.y + 46);

            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.arc(cx + (dir * 4), this.y + 30, 4, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#000000';
            ctx.beginPath(); ctx.arc(cx + (dir * 5), this.y + 30, 2, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#d2a679'; ctx.strokeStyle = '#8b5a2b';
            ctx.beginPath(); ctx.ellipse(cx + (dir * 12), this.y + 32, 4, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
            ctx.fillStyle = '#111'; ctx.fillRect(cx + (dir * 5), this.y + 34, 5, 2);

            if (isShooting && (isLowHp || !this.mgpeaPeanutTopTurn || this.mgpeaGatlingActive)) {
                let gunX = cx + (dir * 14);
                let gunY = this.y + 32;
                ctx.fillStyle = '#333333';
                ctx.fillRect(gunX, gunY - 5, dir * 12, 3);
                ctx.fillRect(gunX, gunY - 1.5, dir * 14, 3);
                ctx.fillRect(gunX, gunY + 2, dir * 12, 3);

                ctx.fillStyle = '#ff6600';
                ctx.fillRect(gunX + dir * 11, gunY - 5, dir * 2, 3);
                ctx.fillRect(gunX + dir * 13, gunY - 1.5, dir * 2, 3);
                ctx.fillRect(gunX + dir * 11, gunY + 2, dir * 2, 3);

                ctx.fillStyle = '#ffcc00'; ctx.shadowBlur = 10; ctx.shadowColor = '#ffcc00';
                ctx.beginPath(); ctx.arc(gunX + dir * 16, gunY, 6 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }

            if (!isLowHp) {
                ctx.fillStyle = '#d2a679'; ctx.strokeStyle = '#8b5a2b';
                ctx.beginPath(); ctx.arc(cx, this.y + 12, 15, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = '#102830';
                ctx.beginPath(); ctx.arc(cx, this.y + 4, 16, Math.PI, 0); ctx.fill();
                ctx.fillRect(cx - 18, this.y + 3, 36, 3);
                ctx.fillStyle = '#ffa500'; ctx.strokeStyle = '#ffa500'; ctx.lineWidth = 2;
                ctx.fillText('★', cx - 12, this.y - 2);
                ctx.beginPath(); ctx.moveTo(cx + 2, this.y - 6); ctx.lineTo(cx + 6, this.y - 10); ctx.lineTo(cx + 10, this.y - 6); ctx.stroke();

                ctx.fillStyle = '#ffffff';
                ctx.beginPath(); ctx.arc(cx + (dir * 4), this.y + 10, 4, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000000';
                ctx.beginPath(); ctx.arc(cx + (dir * 5), this.y + 10, 2, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#d2a679'; ctx.strokeStyle = '#8b5a2b';
                ctx.beginPath(); ctx.ellipse(cx + (dir * 12), this.y + 12, 4, 6, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = '#111'; ctx.fillRect(cx + (dir * 5), this.y + 14, 5, 2);

                ctx.strokeStyle = '#222'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(cx - 10, this.y + 4); ctx.quadraticCurveTo(cx - 2, this.y + 18, cx + 6, this.y + 20); ctx.stroke();

                if (isShooting && (this.mgpeaPeanutTopTurn || this.mgpeaGatlingActive)) {
                    let gunX = cx + (dir * 14);
                    let gunY = this.y + 12;
                    ctx.fillStyle = '#333333';
                    ctx.fillRect(gunX, gunY - 5, dir * 12, 3);
                    ctx.fillRect(gunX, gunY - 1.5, dir * 14, 3);
                    ctx.fillRect(gunX, gunY + 2, dir * 12, 3);

                    ctx.fillStyle = '#ff6600';
                    ctx.fillRect(gunX + dir * 11, gunY - 5, dir * 2, 3);
                    ctx.fillRect(gunX + dir * 13, gunY - 1.5, dir * 2, 3);
                    ctx.fillRect(gunX + dir * 11, gunY + 2, dir * 2, 3);

                    ctx.fillStyle = '#ffcc00'; ctx.shadowBlur = 10; ctx.shadowColor = '#ffcc00';
                    ctx.beginPath(); ctx.arc(gunX + dir * 16, gunY, 6 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                    ctx.shadowBlur = 0;
                }
            } else {
                ctx.strokeStyle = '#8b5a2b'; ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(cx - 10, this.y + 18); ctx.lineTo(cx - 4, this.y + 12); ctx.lineTo(cx + 2, this.y + 20); ctx.lineTo(cx + 8, this.y + 14);
                ctx.stroke();
            }

            ctx.restore();
            return;
        }

        // 6. DẠNG 3 ĐẦU (THREEPEATER)
        if (this.mgpeaForm === 'threepeater') {
            ctx.fillStyle = '#228b22'; ctx.fillRect(cx - 3, cy + 12, 6, this.height / 2 - 12);
            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx - 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.ellipse(cx + 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.fill();

            ctx.strokeStyle = '#2e8b57'; ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.moveTo(cx, cy + 15); ctx.lineTo(cx - dir * 10, this.y + 6);
            ctx.moveTo(cx, cy + 15); ctx.lineTo(cx, this.y + 16);
            ctx.moveTo(cx, cy + 15); ctx.lineTo(cx + dir * 10, this.y + 26);
            ctx.stroke();

            let drawThreepeaterHead = (hx, hy) => {
                ctx.fillStyle = '#7cfc00';
                ctx.beginPath(); ctx.arc(hx, hy, 11, 0, Math.PI * 2); ctx.fill();

                ctx.fillStyle = '#102830';
                ctx.beginPath(); ctx.arc(hx, hy - 4, 11, Math.PI, 0); ctx.fill();
                ctx.fillRect(hx - 12, hy - 5, 24, 2);
                ctx.strokeStyle = '#adff2f'; ctx.lineWidth = 1.5;
                ctx.beginPath(); ctx.moveTo(hx - 2, hy - 9); ctx.lineTo(hx, hy - 12); ctx.lineTo(hx + 2, hy - 9); ctx.stroke();

                ctx.fillStyle = '#111111';
                let gX = hx + (dir * 2);
                ctx.fillRect(gX - 6, hy - 3, 12, 6);
                ctx.fillStyle = '#adff2f';
                ctx.fillRect(gX - 4, hy - 2, 8, 4);

                ctx.fillStyle = '#32cd32';
                ctx.beginPath(); ctx.ellipse(hx + (dir * 10), hy + 3, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
                ctx.fillStyle = '#000';
                ctx.beginPath(); ctx.ellipse(hx + (dir * 11), hy + 3, 2, 4, 0, 0, Math.PI * 2); ctx.fill();

                if (isShooting) {
                    let gunX = hx + (dir * 10);
                    let gunY = hy + 3;
                    ctx.fillStyle = '#333333';
                    ctx.fillRect(gunX, gunY - 4, dir * 10, 2.5);
                    ctx.fillRect(gunX, gunY - 1, dir * 12, 2.5);
                    ctx.fillRect(gunX, gunY + 2, dir * 10, 2.5);

                    ctx.fillStyle = '#ff6600';
                    ctx.fillRect(gunX + dir * 9, gunY - 4, dir * 2, 2.5);
                    ctx.fillRect(gunX + dir * 11, gunY - 1, dir * 2, 2.5);
                    ctx.fillRect(gunX + dir * 9, gunY + 2, dir * 2, 2.5);

                    ctx.fillStyle = '#ffcc00'; ctx.shadowBlur = 10; ctx.shadowColor = '#ffcc00';
                    ctx.beginPath(); ctx.arc(gunX + dir * 14, gunY, 5 + Math.random() * 3, 0, Math.PI * 2); ctx.fill();
                    ctx.shadowBlur = 0;
                }
            };

            drawThreepeaterHead(cx - dir * 10, this.y + 4);
            drawThreepeaterHead(cx, this.y + 14);
            drawThreepeaterHead(cx + dir * 8, this.y + 24);

            ctx.restore();
            return;
        }

        // 7. DẠNG CỔ ĐẠI (PRIMAL)
        if (this.mgpeaForm === 'primal') {
            ctx.fillStyle = '#228b22'; ctx.fillRect(cx - 3, cy + 5, 6, this.height / 2 - 5);
            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx - 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.ellipse(cx + 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#2e8b57';
            for (let i = 0; i < 4; i++) {
                ctx.beginPath(); ctx.moveTo(cx - dir * 12, cy + i * 5); ctx.lineTo(cx - dir * 20, cy + 4 + i * 5); ctx.lineTo(cx - dir * 10, cy + 8 + i * 5); ctx.fill();
            }

            ctx.fillStyle = '#7cfc00';
            ctx.beginPath(); ctx.arc(cx, this.y + 16, 17, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#32cd32';
            ctx.beginPath(); ctx.ellipse(cx + (dir * 16), this.y + 16, 7, 9, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath(); ctx.ellipse(cx + (dir * 17), this.y + 16, 4, 7, 0, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ffffff';
            ctx.beginPath(); ctx.ellipse(cx + (dir * 2), this.y + 12, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#000';
            ctx.beginPath(); ctx.arc(cx + (dir * 3), this.y + 12, 2.5, 0, Math.PI * 2); ctx.fill();
            ctx.fillStyle = '#111';
            ctx.fillRect(cx + (dir * 5), this.y + 19, 7, 2); ctx.fillRect(cx + (dir * 5), this.y + 23, 8, 2.5);

            ctx.fillStyle = '#dfd7c2'; ctx.strokeStyle = '#8b7d6b'; ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.arc(cx - dir * 4, this.y + 4, 18, Math.PI * 0.9, 0.1);
            ctx.lineTo(cx + dir * 6, this.y + 8);
            ctx.lineTo(cx - dir * 18, this.y + 8);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            ctx.fillStyle = '#222';
            ctx.beginPath(); ctx.arc(cx - dir * 4, this.y + 4, 5, 0, Math.PI * 2); ctx.fill();

            ctx.fillStyle = '#ece5d8'; ctx.strokeStyle = '#776b5d';
            ctx.beginPath();
            ctx.moveTo(cx + dir * 8, this.y + 6); ctx.lineTo(cx + dir * 18, this.y - 4); ctx.lineTo(cx + dir * 6, this.y + 2);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cx - dir * 6, this.y - 6); ctx.lineTo(cx - dir * 14, this.y - 24); ctx.lineTo(cx - dir * 2, this.y - 10);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(cx + dir * 2, this.y - 6); ctx.lineTo(cx + dir * 8, this.y - 22); ctx.lineTo(cx + dir * 6, this.y - 10);
            ctx.closePath(); ctx.fill(); ctx.stroke();

            if (isShooting) {
                let gunX = cx + (dir * 18);
                let gunY = this.y + 16;
                ctx.fillStyle = '#333333';
                ctx.fillRect(gunX, gunY - 5, dir * 12, 3);
                ctx.fillRect(gunX, gunY - 1.5, dir * 14, 3);
                ctx.fillRect(gunX, gunY + 2, dir * 12, 3);

                ctx.fillStyle = '#ff6600';
                ctx.fillRect(gunX + dir * 11, gunY - 5, dir * 2, 3);
                ctx.fillRect(gunX + dir * 13, gunY - 1.5, dir * 2, 3);
                ctx.fillRect(gunX + dir * 11, gunY + 2, dir * 2, 3);

                ctx.fillStyle = '#ffcc00'; ctx.shadowBlur = 10; ctx.shadowColor = '#ffcc00';
                ctx.beginPath(); ctx.arc(gunX + dir * 16, gunY, 6 + Math.random() * 4, 0, Math.PI * 2); ctx.fill();
                ctx.shadowBlur = 0;
            }

            ctx.restore();
            return;
        }

        // 8-12. CÁC DẠNG CÒN LẠI (THƯỜNG / LỬA / BĂNG / ĐIỆN / ĐỘC / NỔ)
        let isFire = (this.mgpeaForm === 'fire');
        let isIce = (this.mgpeaForm === 'ice');
        let isElectric = (this.mgpeaForm === 'electric');
        let isPoison = (this.mgpeaForm === 'poison');
        let isBomb = (this.mgpeaForm === 'bomb');

        let bodyColor = isBomb ? '#d60000' : (isFire ? '#e63900' : (isIce ? '#5bebf7' : (isElectric ? '#ffffff' : '#7cfc00')));
        let mouthColor = isBomb ? '#b30000' : (isFire ? '#ff4500' : (isIce ? '#00d2ff' : (isElectric ? '#bbf5ff' : '#32cd32')));
        let helmetColor = isBomb ? '#4a0e17' : '#102830';
        let emblemColor = isBomb ? '#ff4d6d' : (isFire ? '#ff1111' : (isIce ? '#00f0ff' : (isElectric ? '#00ffcc' : (isPoison ? '#aa00ff' : '#ffd700'))));
        let paintColor = isPoison ? '#aa00ff' : (isElectric ? '#00ffcc' : '#111111');

        if (isFire) {
            ctx.save();
            let flameWave = Math.sin(Date.now() / 80) * 4;
            ctx.fillStyle = '#ff6600'; ctx.shadowBlur = 20; ctx.shadowColor = '#ff3300';
            ctx.beginPath(); ctx.moveTo(cx - dir * 10, cy - 10); ctx.quadraticCurveTo(cx - dir * 32, cy - 25 + flameWave, cx - dir * 20, cy - 40); ctx.quadraticCurveTo(cx - dir * 12, cy - 22, cx - dir * 2, cy - 15); ctx.fill();
            ctx.fillStyle = '#ffff00'; ctx.beginPath(); ctx.moveTo(cx - dir * 10, cy - 10); ctx.quadraticCurveTo(cx - dir * 24, cy - 22 + flameWave, cx - dir * 16, cy - 32); ctx.quadraticCurveTo(cx - dir * 10, cy - 18, cx - dir * 4, cy - 14); ctx.fill();
            ctx.restore();
        } else if (isIce) {
            ctx.save();
            ctx.fillStyle = '#bbf5ff'; ctx.strokeStyle = '#00e1ff'; ctx.lineWidth = 1.5; ctx.shadowBlur = 10; ctx.shadowColor = '#00ffff';
            for (let deg of [-35, -15, 5, 25, 45]) {
                let rad = deg * (Math.PI / 180);
                let sx = cx - dir * 10, sy = cy + 2, len = 22;
                ctx.beginPath(); ctx.moveTo(sx, sy - 5); ctx.lineTo(sx - Math.cos(rad) * len * dir, sy + Math.sin(rad) * len); ctx.lineTo(sx, sy + 5); ctx.closePath(); ctx.fill(); ctx.stroke();
            }
            ctx.restore();
        } else if (isElectric) {
            ctx.save();
            ctx.strokeStyle = '#00ffcc'; ctx.lineWidth = 2; ctx.shadowBlur = 15; ctx.shadowColor = '#00ffff';
            ctx.beginPath(); ctx.ellipse(cx, cy, 26 + Math.sin(Date.now() / 60) * 3, 30, 0, 0, Math.PI * 2); ctx.stroke();
            ctx.restore();
        } else if (isPoison) {
            ctx.save();
            ctx.strokeStyle = '#7cfc00'; ctx.lineWidth = 3;
            ctx.beginPath(); ctx.moveTo(cx - dir * 5, this.y + 4); ctx.quadraticCurveTo(cx - dir * 28, this.y - 12, cx - dir * 25, this.y + 12); ctx.stroke();
            ctx.fillStyle = '#4a0e4e'; ctx.strokeStyle = '#ba55d3'; ctx.lineWidth = 1.5;
            ctx.beginPath(); ctx.moveTo(cx - dir * 25, this.y + 12); ctx.quadraticCurveTo(cx - dir * 32, this.y + 24, cx - dir * 25, this.y + 28); ctx.quadraticCurveTo(cx - dir * 18, this.y + 24, cx - dir * 25, this.y + 12); ctx.fill(); ctx.stroke();
            ctx.restore();
        } else {
            ctx.fillStyle = isBomb ? '#800000' : '#2e8b57';
            for (let i = 0; i < 4; i++) {
                ctx.beginPath(); ctx.moveTo(cx - dir * 12, cy - 2 + i * 5); ctx.lineTo(cx - dir * 18, cy + 4 + i * 5); ctx.lineTo(cx, cy + 8 + i * 5); ctx.fill();
            }
        }

        if (isPoison) {
            ctx.fillStyle = '#3a0050'; ctx.fillRect(cx - 5, cy + 2, 10, this.height / 2);
            ctx.fillStyle = '#4a0e4e'; ctx.beginPath(); ctx.ellipse(cx, this.y + this.height - 2, 18, 6, 0, 0, Math.PI * 2); ctx.fill();
        } else {
            ctx.fillStyle = isBomb ? '#590000' : (isFire ? '#992200' : (isIce ? '#008b8b' : '#228b22'));
            ctx.fillRect(cx - 3, cy + 5, 6, this.height / 2 - 5);
            ctx.fillStyle = isBomb ? '#800000' : (isFire ? '#cc3300' : (isIce ? '#20b2aa' : '#32cd32'));
            ctx.beginPath(); ctx.ellipse(cx - 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.ellipse(cx + 10, this.y + this.height - 3, 11, 4, 0, 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = bodyColor;
        ctx.beginPath(); ctx.arc(cx, this.y + 16, 17, 0, Math.PI * 2); ctx.fill();

        let mouthX = this.facingRight ? cx + 12 : cx - 22;
        let mouthY = this.y + 10;
        ctx.fillStyle = mouthColor;
        ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 8 : 2), mouthY + 7, 7, 9, 0, 0, Math.PI * 2); ctx.fill();

        if (this.mgpeaMuzzleAnim > 0 || this.mgpeaGatlingActive) {
            let gunX = this.facingRight ? mouthX + 6 : mouthX - 10;
            ctx.fillStyle = '#333333';
            ctx.fillRect(gunX, mouthY + 2, dir * 12, 3);
            ctx.fillRect(gunX, mouthY + 6, dir * 14, 3);
            ctx.fillRect(gunX, mouthY + 10, dir * 12, 3);

            ctx.fillStyle = isIce ? '#00ffff' : (isElectric ? '#00ffcc' : (isPoison ? '#ba55d3' : '#ff6600'));
            ctx.fillRect(gunX + dir * 11, mouthY + 2, dir * 2, 3);
            ctx.fillRect(gunX + dir * 13, mouthY + 6, dir * 2, 3);
            ctx.fillRect(gunX + dir * 11, mouthY + 10, dir * 2, 3);

            ctx.fillStyle = isIce ? '#00ffff' : (isElectric ? '#39ff14' : (isPoison ? '#aa00ff' : '#ffcc00'));
            ctx.shadowBlur = 10;
            ctx.shadowColor = ctx.fillStyle;
            ctx.beginPath();
            ctx.arc(gunX + dir * 16, mouthY + 7, 6 + Math.random() * 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#000000';
            ctx.beginPath(); ctx.ellipse(mouthX + (this.facingRight ? 9 : 1), mouthY + 7, 4, 7, 0, 0, Math.PI * 2); ctx.fill();
        }

        ctx.fillStyle = (isFire || isBomb) ? '#ffff00' : (isElectric ? '#00ffcc' : '#ffffff');
        let eyeX = this.facingRight ? cx + 2 : cx - 10;
        ctx.beginPath(); ctx.ellipse(eyeX, this.y + 11, 4, 6, 0, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = (isFire || isBomb) ? '#ff3300' : (isElectric ? '#ffffff' : '#000000');
        ctx.beginPath(); ctx.arc(eyeX + (this.facingRight ? 1.5 : -1.5), this.y + 11, (isFire || isBomb) ? 2 : 2.5, 0, Math.PI * 2); ctx.fill();

        ctx.fillStyle = paintColor;
        let paintX = this.facingRight ? cx + 6 : cx - 12;
        ctx.fillRect(paintX, this.y + 19, 6, 2); ctx.fillRect(paintX, this.y + 23, 7, 2.5);

        ctx.fillStyle = helmetColor;
        ctx.beginPath(); ctx.arc(cx - dir * 2, this.y + 6, 19, Math.PI, 0); ctx.fill();
        ctx.fillStyle = '#0a1a20'; ctx.fillRect(cx - 21, this.y + 4, 40, 4);

        ctx.strokeStyle = emblemColor; ctx.lineWidth = 2.5;
        let chevX = this.facingRight ? cx - 3 : cx + 3;
        for (let v = 0; v < 3; v++) {
            ctx.beginPath(); ctx.moveTo(chevX - 6, this.y - 6 + v * 4); ctx.lineTo(chevX, this.y - 10 + v * 4); ctx.lineTo(chevX + 6, this.y - 6 + v * 4); ctx.stroke();
        }

        ctx.fillStyle = emblemColor; ctx.font = 'bold 9px Arial';
        let starOffset = this.facingRight ? -14 : 7;
        ctx.fillText('★', cx + starOffset, this.y - 2);
        ctx.font = 'bold 7px Arial';
        ctx.fillText('★', cx + starOffset + (this.facingRight ? -5 : 7), this.y + 3);
        ctx.fillText('★', cx + starOffset + (this.facingRight ? 5 : -7), this.y + 3);

        ctx.restore();
    }

    originalMgPeaDraw.apply(this, arguments);
};

// --- DỮ LIỆU THƯ VIỆN TƯỚNG (📖) ---
if (typeof HeroData !== 'undefined') {
    HeroData.mgpea = {
        difficulty: 3,
        passive: "NỘI TẠI: GATLING BARRAGE\n- Đánh thường có 5% tỉ lệ kích hoạt xả 60 viên đạn Gatling trong 2.25s theo hình quạt Parabol (ưu tiên bắn thẳng trung tâm).\n- Trong 2.25s này: Khóa di chuyển, miễn nhiễm khống chế và BẤT TỬ 100% sát thương nhận vào.\n- Sau khi kết thúc nội tại, đòn kế tiếp bắn chuỗi 5 viên thay vì 4 viên.",
        c1: "ĐẠN ĐẬU LỬA (HC: 8s)\n- Cường hóa 3 đòn đánh thường kế tiếp thành đạn đậu lửa (14 sát thương mỗi viên).\n- Bị khóa khi đang ở Dạng Biến Hình hoặc chọn Cố định Dạng.",
        c2: "NẠP ĐẠN TỐI ĐA (HC: 10s)\n- Kích hoạt 100% tỉ lệ nổ Nội Tại Gatling cho đòn đánh thường kế tiếp.",
        c3: "CHUYỂN DẠNG NGUYÊN TỐ (HC: 10s sau khi hết dạng)\n- Ngẫu nhiên biến thành 1 trong 12 dạng tối thượng trong 10 giây (Bị khóa khi chọn Cố định Dạng):\n  ✂️ KÉO CẮT (ONG GAI): Bắn 4 con ong lao cực nhanh (10 DMG, choáng 0.15s). NỘI TẠI: Bão 60 con ong gai tốc độ siêu thanh gây CHOÁNG 1.5S!\n  ☀️ MẶT TRỜI: Bắn đạn quang năng (6 DMG + Hồi 1 HP). 10% ra Tia Laze Mặt Trời xuyên hàng (14 DMG + Hồi 6 HP). NỘI TẠI: Bắn 60 viên đỗ mặt trời, 15% từng viên hóa thành Tia Laze!\n  🌊 NƯỚC: Bắn chùm 12 viên đạn nước 3 hướng (4 thẳng, 4 lệch +15°, 4 lệch -15°) gây 12 DMG/viên. NỘI TẠI: Xả cơn mưa 60 viên đạn nước quét 3 hướng (lệch tối đa ±15° mỗi hướng)!\n  🔥 LỬA: Đạn lửa (14 ST), 15% ra Đạn Lửa Xanh (21 ST).\n  ❄️ BĂNG: Đạn băng (7 ST) làm chậm 50% chạy & đánh trong 5s. 5% bắn Tảng Băng CHOÁNG 5S!\n  ⚡ ĐIỆN: Đạn bay chậm, giật sét 5 ST mỗi 0.2s trong 175px.\n  ☠️ ĐỘC: 5 ST, phá giáp Shield, tích lũy độc (+2 ST/tầng) & thiêu đốt độc 2 ST/s trong 5s.\n  🛡️ PHÒNG THỦ: Nhận lượng Shield bằng đúng HP hiện tại. Tốc đánh 0.6s (>= 50% HP) hoặc 1.2s (< 50% HP). Bắn luân phiên 4 viên mỗi đầu. NỘI TẠI: Thả 6 quả Wall-nut khổng lồ (200px) lăn chậm, xóa đạn địch và gây 5 ST/3 frame khi chạm phải!\n  🦖 CỔ ĐẠI: Bắn đạn đậu khổng lồ 15 ST và gây Choáng 0.25s!\n  👥 3 ĐẦU: Đòn thường bắn toả 12 viên (5 ST) tập trung tâm ±5°. Nội tại xả bão đạn 180 viên trên cả 3 đầu!\n  💣 NỔ: Tốc đánh chậm 1.5s, bắn đạn bom nổ tung gây 40 ST/viên!\n  🫛 PHÁO ĐẬU (PEA POD): Tốc đánh chậm 1.5s. Bắn 20 viên đậu khổng lồ lên trời rơi dần trong 1.5s (ưu tiên quanh trục X của địch 250px). 33% tỉ lệ va chạm Platform, nổ lan 100px gây 10 ST (rơi trúng đầu địch gây 40 ST!). NỘI TẠI: Xả 3 đợt đại bác liên tiếp lên trời dội bão 120 viên đậu mưa xuống!"
    };
}