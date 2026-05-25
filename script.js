
    // Custom Cursor
    const dot = document.getElementById('cursorDot');
    const ring = document.getElementById('cursorRing');
    let mouseX=0,mouseY=0,ringX=0,ringY=0;
    document.addEventListener('mousemove',e=>{
      mouseX=e.clientX;mouseY=e.clientY;
      dot.style.left=mouseX+'px';dot.style.top=mouseY+'px';
    });
    function animateRing(){
      ringX+=(mouseX-ringX)*0.12;ringY+=(mouseY-ringY)*0.12;
      ring.style.left=ringX+'px';ring.style.top=ringY+'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();
    document.querySelectorAll('a,button,.skill-category,.project-card,.pill,.badge').forEach(el=>{
      el.addEventListener('mouseenter',()=>ring.classList.add('hovered'));
      el.addEventListener('mouseleave',()=>ring.classList.remove('hovered'));
    });

    // Theme Toggle
    const toggle=document.getElementById('themeToggle');
    const icon=document.getElementById('themeIcon');
    const lbl=document.getElementById('themeLabel');
    const html=document.documentElement;
    let isDark=true;
    toggle.addEventListener('click',()=>{
      isDark=!isDark;
      html.setAttribute('data-theme',isDark?'dark':'light');
      icon.textContent=isDark?'🌙':'☀️';
      lbl.textContent=isDark?'Dark':'Light';
    });

    // Hamburger
    const ham=document.getElementById('hamburger');
    const navLinks=document.getElementById('navLinks');
    ham.addEventListener('click',()=>{
      ham.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
      ham.classList.remove('open');navLinks.classList.remove('open');
    }));

    // Progress Bar
    const bar=document.getElementById('progress-bar');
    window.addEventListener('scroll',()=>{
      const pct=window.scrollY/(document.body.scrollHeight-window.innerHeight)*100;
      bar.style.width=pct+'%';
    });

    // Scroll Reveal
    const revealEls=document.querySelectorAll('.reveal');
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
    },{threshold:0.12});
    revealEls.forEach(el=>obs.observe(el));

    // Active Nav
    const sections=document.querySelectorAll('section[id]');
    const navAs=document.querySelectorAll('.nav-links a');
    const navObs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          navAs.forEach(a=>a.style.color='');
          const link=document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
          if(link)link.style.color='var(--accent)';
        }
      });
    },{threshold:0.4});
    sections.forEach(s=>navObs.observe(s));

    // Typing Effect
    const roles=['Full Stack Developer','Frontend Engineer','Backend Developer','Problem Solver'];
    const titleEl=document.getElementById('heroTitle');
    let roleIdx=0,charIdx=0,deleting=false;
    function typeRole(){
      const cur=roles[roleIdx];
      if(!deleting){
        titleEl.textContent=cur.slice(0,charIdx+1);
        charIdx++;
        if(charIdx===cur.length){deleting=true;setTimeout(typeRole,1800);return;}
      } else {
        titleEl.textContent=cur.slice(0,charIdx-1);
        charIdx--;
        if(charIdx===0){deleting=false;roleIdx=(roleIdx+1)%roles.length;}
      }
      setTimeout(typeRole,deleting?60:90);
    }
    setTimeout(typeRole,1500);
  
