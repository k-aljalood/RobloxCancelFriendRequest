// made by: @k_aljalood

(async () => {
    const processingUsers = new Set();
    const userStates = new Map();

    const PROFILE_ADD_FRIEND_TEXTS = {
        en: "Add Friend",
        ar: "إضافة صديق",
        id: "Tambahkan Teman",
        de: "Freund hinzufügen",
        es: "Añadir amigo",
        fr: "Ajouter un(e) ami(e)",
        it: "Aggiungi amico",
        pl: "Dodaj znajomego",
        pt: "Adicionar amigo",
        vi: "Thêm bạn bè",
        tr: "Arkadaş Ekle",
        hi: "फ़्रेंड जोड़ें",
        th: "เพิ่มเพื่อน",
        zh: "添加好友",
        zh_cn: "添加好友",
        zh_tw: "新增好友",
        zh_hans: "添加好友",
        zh_hant: "新增好友",
        ja: "友達を追加",
        ko: "친구 추가",
        ms: "Tambah Rakan",
        nb: "Legg til venn",
        no: "Legg til venn",
        sr: "Додај пријатеља",
        da: "Tilføj ven",
        et: "Lisa sõber",
        fil: "Magdagdag ng Kaibigan",
        tl: "Magdagdag ng Kaibigan",
        hr: "Dodaj prijatelja",
        lv: "Pievienot draugu",
        lt: "Pridėti draugą",
        hu: "Barát hozzáadása",
        nl: "Vriend toevoegen",
        ro: "Adaugă prieten",
        sq: "Shto shok",
        sl: "Dodaj prijatelja",
        sk: "Pridať priateľa",
        fi: "Lisää kaveri",
        sv: "Lägg till vän",
        uk: "Додати друга",
        cs: "Přidat přítele",
        el: "Προσθήκη φίλου",
        bs: "Dodaj prijatelja",
        bg: "Добавяне на приятел",
        ru: "Добавить в друзья",
        kk: "Дос қосу",
        bn: "বন্ধু যোগ করুন",
        si: "මිතුරෙකු එක් කරන්න",
        my: "သူငယ်ချင်းထည့်ရန်",
        ka: "მეგობრის დამატება",
        km: "បន្ថែមមិត្តភក្តិ"
    };

    const SEARCH_ADD_FRIEND_TEXTS = {
        ...PROFILE_ADD_FRIEND_TEXTS,
        en: "Add friend",
        es: "Añadir amistad",
        fr: "Ajouter un ami",
        it: "Aggiungi agli amici",
        pt: "Adicionar amizade",
        tr: "Arkadaş ekle"
    };

    const PROFILE_CANCEL_REQUEST_TEXTS = {
        en: "Cancel Request",
        ar: "إلغاء الطلب",
        id: "Batalkan Permintaan",
        de: "Anfrage abbrechen",
        es: "Cancelar solicitud",
        fr: "Annuler la demande",
        it: "Annulla richiesta",
        pl: "Anuluj prośbę",
        pt: "Cancelar pedido",
        vi: "Hủy yêu cầu",
        tr: "İsteği İptal Et",
        hi: "रिक्वेस्ट कैंसिल करें",
        th: "ยกเลิกคำขอ",
        zh: "取消邀请",
        zh_cn: "取消邀请",
        zh_tw: "取消邀請",
        zh_hans: "取消邀请",
        zh_hant: "取消邀請",
        ja: "リクエストをキャンセル",
        ko: "요청 취소",
        ms: "Batalkan Permintaan",
        nb: "Avbryt forespørsel",
        no: "Avbryt forespørsel",
        sr: "Откажи захтев",
        da: "Annuller anmodning",
        et: "Tühista taotlus",
        fil: "Kanselahin ang Kahilingan",
        tl: "Kanselahin ang Kahilingan",
        hr: "Otkaži zahtjev",
        lv: "Atcelt pieprasījumu",
        lt: "Atšaukti užklausą",
        hu: "Kérelem visszavonása",
        nl: "Verzoek annuleren",
        ro: "Anulează cererea",
        sq: "Anulo kërkesën",
        sl: "Prekliči zahtevo",
        sk: "Zrušiť žiadosť",
        fi: "Peruuta pyyntö",
        sv: "Avbryt förfrågan",
        uk: "Скасувати запит",
        cs: "Zrušit žádost",
        el: "Ακύρωση αιτήματος",
        bs: "Otkaži zahtjev",
        bg: "Отмяна на заявката",
        ru: "Отменить запрос",
        kk: "Сұраныстан бас тарту",
        bn: "অনুরোধ বাতিল করুন",
        si: "ඉල්ලීම අවලංගු කරන්න",
        my: "တောင်းဆိုမှုကို ပယ်ဖျက်ရန်",
        ka: "მოთხოვნის გაუქმება",
        km: "បោះបង់សំណើ"
    };

    const SEARCH_CANCEL_REQUEST_TEXTS = {
        ...PROFILE_CANCEL_REQUEST_TEXTS,
        en: "Cancel request",
        tr: "İsteği iptal et"
    };

    const REQUEST_SENT_TEXTS = {
        en: "Request sent",
        ar: "تم إرسال الطلب",
        id: "Permintaan dikirim",
        de: "Anfrage gesendet",
        es: "Solicitud enviada",
        fr: "Demande envoyée",
        it: "Richiesta inviata",
        pl: "Wysłano prośbę",
        pt: "Pedido enviado",
        vi: "Đã gửi yêu cầu",
        tr: "İstek gönderildi",
        hi: "रिक्वेस्ट भेजी गई",
        th: "ส่งคำขอแล้ว",
        zh: "邀请已发送",
        zh_cn: "邀请已发送",
        zh_tw: "已傳送邀請",
        zh_hans: "邀请已发送",
        zh_hant: "已傳送邀請",
        ja: "リクエストを送信しました",
        ko: "요청 전송",
        ms: "Permintaan dihantar",
        nb: "Forespørsel sendt",
        no: "Forespørsel sendt",
        sr: "Захтев послат",
        da: "Anmodning sendt",
        et: "Taotlus saadetud",
        fil: "Naipadala ang kahilingan",
        tl: "Naipadala ang kahilingan",
        hr: "Zahtjev poslan",
        lv: "Pieprasījums nosūtīts",
        lt: "Užklausa išsiųsta",
        hu: "Kérelem elküldve",
        nl: "Verzoek verzonden",
        ro: "Cerere trimisă",
        sq: "Kërkesa u dërgua",
        sl: "Zahteva poslana",
        sk: "Žiadosť odoslaná",
        fi: "Pyyntö lähetetty",
        sv: "Förfrågan skickad",
        uk: "Запит надіслано",
        cs: "Žádost odeslána",
        el: "Το αίτημα στάλθηκε",
        bs: "Zahtjev poslan",
        bg: "Заявката е изпратена",
        ru: "Запрос отправлен",
        kk: "Сұраныс жіберілді",
        bn: "অনুরোধ পাঠানো হয়েছে",
        si: "ඉල්ලීම යවන ලදී",
        my: "တောင်းဆိုချက် ပို့ပြီးပါပြီ",
        ka: "მოთხოვნა გაგზავნილია",
        km: "បានផ្ញើសំណើ"
    };

    const ACTION_ADD_TEXTS = {
        en: "Add",
        ar: "إضافة",
        id: "Tambahkan",
        de: "Hinzufügen",
        es: "Añadir",
        fr: "Ajouter",
        it: "Aggiungi",
        pl: "Dodaj",
        pt: "Adicionar",
        vi: "Thêm",
        tr: "Ekle",
        hi: "जोड़ें",
        th: "เพิ่ม",
        zh: "添加",
        zh_cn: "添加",
        zh_tw: "新增",
        zh_hans: "添加",
        zh_hant: "新增",
        ja: "追加",
        ko: "추가하기",
        ms: "Tambah",
        nb: "Legg til",
        no: "Legg til",
        sr: "Додај",
        da: "Tilføj",
        et: "Lisa",
        fil: "Magdagdag",
        tl: "Magdagdag",
        hr: "Dodaj",
        lv: "Pievienot",
        lt: "Pridėti",
        hu: "Hozzáadás",
        nl: "Toevoegen",
        ro: "Adaugă",
        sq: "Shto",
        sl: "Dodaj",
        sk: "Pridať",
        fi: "Lisää",
        sv: "Lägg till",
        uk: "Додати",
        cs: "Přidat",
        el: "Προσθήκη",
        bs: "Dodaj",
        bg: "Добавяне",
        ru: "Добавить",
        kk: "Қосу",
        bn: "যোগ করুন",
        si: "එක් කරන්න",
        my: "ထည့်ရန်",
        ka: "დამატება",
        km: "បន្ថែម"
    };

    const ACTION_CANCEL_TEXTS = {
        en: "Cancel",
        ar: "إلغاء",
        id: "Batalkan",
        de: "Abbrechen",
        es: "Cancelar",
        fr: "Annuler",
        it: "Annulla",
        pl: "Anuluj",
        pt: "Cancelar",
        vi: "Hủy Bỏ",
        tr: "İptal Et",
        hi: "कैंसिल करें",
        th: "ยกเลิก",
        zh: "取消",
        zh_cn: "取消",
        zh_tw: "取消",
        zh_hans: "取消",
        zh_hant: "取消",
        ja: "キャンセル",
        ko: "취소",
        ms: "Batal",
        nb: "Avbryt",
        no: "Avbryt",
        sr: "Откажи",
        da: "Annuller",
        et: "Tühista",
        fil: "Kanselahin",
        tl: "Kanselahin",
        hr: "Otkaži",
        lv: "Atcelt",
        lt: "Atšaukti",
        hu: "Mégse",
        nl: "Annuleren",
        ro: "Anulează",
        sq: "Anulo",
        sl: "Prekliči",
        sk: "Zrušiť",
        fi: "Peruuta",
        sv: "Avbryt",
        uk: "Скасувати",
        cs: "Zrušit",
        el: "Ακύρωση",
        bs: "Otkaži",
        bg: "Отказ",
        ru: "Отмена",
        kk: "Болдырмау",
        bn: "বাতিল",
        si: "අවලංගු කරන්න",
        my: "ပယ်ဖျက်ရန်",
        ka: "გაუქმება",
        km: "បោះបង់"
    };

    const injectStyles = () => {
        if (document.getElementById('cancel-friend-request-styles')) return;
        const style = document.createElement('style');
        style.id = 'cancel-friend-request-styles';
        style.innerHTML = `
            @keyframes custom-progress-circle-rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            .foundation-web-progress-circle-indeterminate {
                animation: custom-progress-circle-rotate 1.2s linear infinite !important;
            }
        `;
        (document.head || document.documentElement).appendChild(style);
    };

    const getSpinnerHtml = () => `
        <div class="foundation-web-progress-circle inline-flex items-center justify-center" role="progressbar" style="width: 16px; height: 16px; display: inline-flex; vertical-align: middle;">
            <svg width="16" height="16" viewBox="0 0 32 32" style="display: block;">
                <circle cx="16" cy="16" r="14.5" fill="none" stroke-width="3" style="stroke: var(--color-shift-200);"></circle>
                <circle cx="16" cy="16" r="14.5" fill="none" stroke-width="3" stroke-dasharray="68.329640215578 22.776546738526" stroke-dashoffset="0" stroke-linecap="round" class="foundation-web-progress-circle-indeterminate" style="stroke: currentColor; transform-origin: 50% 50%;"></circle>
            </svg>
        </div>
    `;

    const getLangCode = () => {
        let code = "";
        const htmlLang = document.documentElement.lang;
        if (htmlLang) {
            code = htmlLang.toLowerCase().replace("-", "_");
        } else {
            const meta = document.querySelector('meta[name="locale-data"]');
            if (meta) {
                code = (meta.getAttribute("data-language-code") || "").toLowerCase().replace("-", "_");
            }
        }
        return code || "en";
    };

    const getTranslation = (dict) => {
        const fullCode = getLangCode();
        const baseCode = fullCode.split("_")[0];
        return dict[fullCode] || dict[baseCode] || dict.en;
    };

    const getCsrfToken = async () => {
        const meta = document.querySelector('meta[name="csrf-token"]');
        if (meta && meta.getAttribute('data-token')) {
            return meta.getAttribute('data-token');
        }
        try {
            const res = await fetch('https://auth.roblox.com/v2/login', {
                method: 'POST',
                credentials: 'include'
            });
            return res.headers.get('x-csrf-token') || '';
        } catch (_) {
            return '';
        }
    };

    const fetchWithRetry = async (url, options = {}, delay = 1500) => {
        let currentDelay = delay;
        while (true) {
            try {
                const res = await fetch(url, options);
                if (res.ok) return res;

                if (res.status === 403) {
                    const token = res.headers.get('x-csrf-token');
                    if (token) {
                        options.headers = options.headers || {};
                        options.headers['X-CSRF-TOKEN'] = token;
                        continue;
                    }
                }

                if (res.status === 429) {
                    const retryAfter = res.headers.get('Retry-After');
                    const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : currentDelay;
                    await new Promise(resolve => setTimeout(resolve, waitTime));
                    currentDelay = Math.min(currentDelay * 1.5, 10000);
                    continue;
                }

                if (res.status < 500 && res.status !== 403) return res;
            } catch {}
            await new Promise(resolve => setTimeout(resolve, currentDelay));
            currentDelay = Math.min(currentDelay * 1.5, 10000);
        }
    };

    const cancelFriendRequest = async (targetUserId) => {
        const csrf = await getCsrfToken();
        const res = await fetchWithRetry(`https://friends.roblox.com/v1/users/${targetUserId}/unfriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf
            },
            credentials: 'include'
        });
        return res ? res.ok : false;
    };

    const sendFriendRequest = async (targetUserId) => {
        const csrf = await getCsrfToken();
        const res = await fetchWithRetry(`https://friends.roblox.com/v1/users/${targetUserId}/request-friendship`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf
            },
            body: JSON.stringify({ friendshipOriginSourceType: 0 }),
            credentials: 'include'
        });
        return res ? res.ok : false;
    };

    const getTargetUserId = () => {
        const match = window.location.pathname.match(/\/users\/(\d+)/);
        return match ? match[1] : null;
    };

    const getUserIdFromElement = (element) => {
        if (!element) return null;

        const playerCard = element.closest('.player-search-card, [data-testid*="player-card-"]');
        if (playerCard) {
            const testId = playerCard.getAttribute('data-testid');
            const match = testId ? testId.match(/player-card-(\d+)/) : null;
            if (match) return match[1];
        }

        let curr = element;
        while (curr && curr !== document.body) {
            const key = Object.keys(curr).find(k => k.startsWith('__reactFiber$') || k.startsWith('__reactInternalInstance$') || k.startsWith('__reactProps$'));
            if (key) {
                let fiber = curr[key];
                let depth = 0;
                while (fiber && depth < 30) {
                    const props = fiber.memoizedProps || fiber.pendingProps;
                    if (props) {
                        const id = props.userId || props.targetUserId || props.userProfileId || props.profileUserId || props.friendId || props.user?.id || props.friend?.id || props.player?.id || props.id;
                        if (id && /^\d+$/.test(String(id))) return String(id);
                    }
                    fiber = fiber.return;
                    depth++;
                }
            }
            curr = curr.parentElement;
        }

        const containerWithData = element.closest('[data-user-id], [data-target-user-id], [data-user-profile-id], [data-profile-user-id], [data-friend-user-id], [data-id]');
        if (containerWithData) {
            const id = containerWithData.getAttribute('data-user-id') || 
                       containerWithData.getAttribute('data-target-user-id') || 
                       containerWithData.getAttribute('data-user-profile-id') || 
                       containerWithData.getAttribute('data-profile-user-id') || 
                       containerWithData.getAttribute('data-friend-user-id') || 
                       containerWithData.getAttribute('data-id');
            if (id && /^\d+$/.test(id)) return id;
        }

        const container = element.closest('.player-search-card, .avatar-card-container, .player-avatar-card, .avatar-card-item, .list-item, .search-card, .user-card, .user-row, li, tr, div[ng-repeat]') || element.parentElement;
        if (container) {
            const link = container.querySelector('a[href*="/users/"], a[href*="profile?userId="]');
            if (link) {
                const match = link.getAttribute('href').match(/\/users\/(\d+)/) || link.getAttribute('href').match(/userId=(\d+)/);
                if (match) return match[1];
            }
        }

        return getTargetUserId();
    };

    const setProfileButtonToAdd = (btn, isProcessing = false) => {
        const expectedText = getTranslation(PROFILE_ADD_FRIEND_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span') || btn;

        btn.dataset.customProfileState = 'add';
        btn.id = 'user-profile-header-AddFriend';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!textSpan.querySelector('.foundation-web-progress-circle')) {
                textSpan.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.removeAttribute('disabled');
            btn.removeAttribute('aria-disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (textSpan.textContent !== expectedText) {
                textSpan.textContent = expectedText;
            }
        }

        const hasJoin = document.getElementById('user-profile-header-JoinExperience') || btn.parentElement?.querySelector('#user-profile-header-JoinExperience');
        if (hasJoin) {
            btn.classList.remove('bg-action-emphasis', 'content-action-emphasis');
            btn.classList.add('bg-action-standard', 'content-action-standard');
        } else {
            btn.classList.remove('bg-action-standard', 'content-action-standard');
            btn.classList.add('bg-action-emphasis', 'content-action-emphasis');
        }
    };

    const setProfileButtonToCancel = (btn, isProcessing = false) => {
        const expectedText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span') || btn;

        btn.dataset.customProfileState = 'cancel';
        btn.id = 'user-profile-header-PendingFriendRequest';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!textSpan.querySelector('.foundation-web-progress-circle')) {
                textSpan.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.removeAttribute('disabled');
            btn.removeAttribute('aria-disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (textSpan.textContent !== expectedText) {
                textSpan.textContent = expectedText;
            }
        }

        btn.classList.remove('bg-action-emphasis', 'content-action-emphasis');
        btn.classList.add('bg-action-standard', 'content-action-standard');
    };

    const setSearchButtonToAdd = (btn, isProcessing = false) => {
        const expectedText = getTranslation(SEARCH_ADD_FRIEND_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span') || btn;

        btn.dataset.customSearchState = 'add';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!textSpan.querySelector('.foundation-web-progress-circle')) {
                textSpan.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.removeAttribute('disabled');
            btn.removeAttribute('aria-disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (textSpan.textContent !== expectedText) {
                textSpan.textContent = expectedText;
            }
        }

        if (btn.classList.contains('foundation-web-button') || btn.closest('.player-search-actions')) {
            btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer relative flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard width-full player-search-action-parity';
        } else if (!btn.className.includes('btn-control-md')) {
            btn.className = 'btn-control-md full-size ng-scope';
        }
    };

    const setSearchButtonToCancel = (btn, isProcessing = false) => {
        const expectedText = getTranslation(SEARCH_CANCEL_REQUEST_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span') || btn;

        btn.dataset.customSearchState = 'cancel';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!textSpan.querySelector('.foundation-web-progress-circle')) {
                textSpan.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.removeAttribute('disabled');
            btn.removeAttribute('aria-disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (textSpan.textContent !== expectedText) {
                textSpan.textContent = expectedText;
            }
        }

        if (btn.classList.contains('foundation-web-button') || btn.closest('.player-search-actions')) {
            btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer relative flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard width-full player-search-action-parity';
        } else if (!btn.className.includes('btn-control-md')) {
            btn.className = 'btn-control-md full-size ng-scope';
        }
    };

    const setActionButtonToAdd = (btn, isProcessing = false) => {
        const expectedText = getTranslation(ACTION_ADD_TEXTS);
        const span = btn.querySelector('span.padding-y-xsmall') || btn.querySelector('span') || btn;

        btn.dataset.customActionState = 'add';
        btn.id = 'action-button-AddFriend';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!span.querySelector('.foundation-web-progress-circle')) {
                span.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.setAttribute('aria-disabled', 'false');
            btn.removeAttribute('disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (span.textContent !== expectedText) {
                span.textContent = expectedText;
            }
        }

        btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-emphasis content-action-emphasis shrink-0 margin-right-medium';
    };

    const setActionButtonToCancel = (btn, isProcessing = false) => {
        const expectedText = getTranslation(ACTION_CANCEL_TEXTS);
        const span = btn.querySelector('span.padding-y-xsmall') || btn.querySelector('span') || btn;

        btn.dataset.customActionState = 'cancel';
        btn.id = 'action-button-PendingFriendRequest';
        btn.disabled = isProcessing;

        if (isProcessing) {
            btn.setAttribute('disabled', '');
            btn.setAttribute('aria-disabled', 'true');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'not-allowed', 'important');
            btn.style.setProperty('pointer-events', 'none', 'important');
            const currentWidth = btn.getBoundingClientRect().width;
            if (currentWidth > 0 && !btn.style.minWidth) {
                btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
            }
            if (!span.querySelector('.foundation-web-progress-circle')) {
                span.innerHTML = getSpinnerHtml();
            }
        } else {
            btn.style.removeProperty('min-width');
            btn.setAttribute('aria-disabled', 'false');
            btn.removeAttribute('disabled');
            btn.classList.remove('opacity-[0.5]');
            btn.style.setProperty('opacity', '1', 'important');
            btn.style.setProperty('cursor', 'pointer', 'important');
            btn.style.setProperty('pointer-events', 'auto', 'important');
            if (span.textContent !== expectedText) {
                span.textContent = expectedText;
            }
        }

        btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard shrink-0 margin-right-medium';
    };

    const setUserState = (userId, state) => {
        userStates.set(userId, state);
        const isProcessing = processingUsers.has(userId);

        if (getTargetUserId() === userId) {
            const profileBtns = document.querySelectorAll('#user-profile-header-PendingFriendRequest, #user-profile-header-AddFriend, button[id*="PendingFriendRequest"], button[id*="AddFriend"]');
            profileBtns.forEach(btn => {
                if (state === 'pending') {
                    setProfileButtonToCancel(btn, isProcessing);
                } else if (state === 'none') {
                    setProfileButtonToAdd(btn, isProcessing);
                }
            });

            const menuItems = document.querySelectorAll('div[role="menu"] button[role="menuitem"], .foundation-web-menu button[role="menuitem"]');
            menuItems.forEach(btn => {
                if (btn.dataset.customMenuState) {
                    const titleSpan = btn.querySelector('.foundation-web-menu-item-title') || btn.querySelector('span') || btn;
                    btn.disabled = isProcessing;

                    if (isProcessing) {
                        btn.style.setProperty('cursor', 'not-allowed', 'important');
                        btn.style.setProperty('pointer-events', 'none', 'important');
                        if (!titleSpan.querySelector('.foundation-web-progress-circle')) {
                            titleSpan.innerHTML = getSpinnerHtml();
                        }
                    } else {
                        btn.style.setProperty('cursor', 'pointer', 'important');
                        btn.style.setProperty('pointer-events', 'auto', 'important');
                        if (state === 'pending') {
                            btn.dataset.customMenuState = 'cancel';
                            titleSpan.textContent = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                        } else if (state === 'none') {
                            btn.dataset.customMenuState = 'add';
                            titleSpan.textContent = getTranslation(PROFILE_ADD_FRIEND_TEXTS);
                        }
                    }
                }
            });
        }

        const searchBtns = document.querySelectorAll('.player-search-actions button, button.player-search-action-parity, .avatar-card-btns button:not(.accept-friend):not(.ignore-friend), button[ng-if*="PendingOnOtherUser"], button[ng-if*="NoFriendship"]');
        searchBtns.forEach(btn => {
            if (btn.classList.contains('accept-friend') || btn.classList.contains('ignore-friend') || btn.closest('.friends-content')) return;
            if (getUserIdFromElement(btn) === userId) {
                if (state === 'pending') {
                    setSearchButtonToCancel(btn, isProcessing);
                } else {
                    setSearchButtonToAdd(btn, isProcessing);
                }
            }
        });

        const actionBtns = document.querySelectorAll('button[id="action-button-PendingFriendRequest"], button[id="action-button-AddFriend"]');
        actionBtns.forEach(btn => {
            if (getUserIdFromElement(btn) === userId) {
                if (state === 'pending') {
                    setActionButtonToCancel(btn, isProcessing);
                } else {
                    setActionButtonToAdd(btn, isProcessing);
                }
            }
        });
    };

    const updateProfileButton = () => {
        const targetUserId = getTargetUserId();
        if (!targetUserId) return;

        const isFriend = document.querySelector('#user-profile-header-EditAlias, #user-profile-header-Chat, [data-testid="user-profile-header-friends"]');
        if (isFriend) {
            userStates.set(targetUserId, 'friends');
            return;
        }

        const btns = document.querySelectorAll('#user-profile-header-PendingFriendRequest, #user-profile-header-AddFriend, button[id*="PendingFriendRequest"], button[id*="AddFriend"]');
        btns.forEach(btn => {
            let knownState = userStates.get(targetUserId);

            if (knownState === 'friends') {
                knownState = 'none';
                userStates.set(targetUserId, 'none');
            }

            if (!btn.dataset.customProfileState && !processingUsers.has(targetUserId)) {
                if (btn.id === 'user-profile-header-AddFriend') {
                    knownState = 'none';
                    userStates.set(targetUserId, 'none');
                } else if (btn.id === 'user-profile-header-PendingFriendRequest') {
                    knownState = 'pending';
                    userStates.set(targetUserId, 'pending');
                }
            }

            const isProcessing = processingUsers.has(targetUserId);

            if (knownState === 'pending') {
                setProfileButtonToCancel(btn, isProcessing);
            } else if (knownState === 'none') {
                setProfileButtonToAdd(btn, isProcessing);
            } else {
                const expectedCancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                const isPending = btn.id.includes('PendingFriendRequest') || btn.textContent.trim() === 'Pending' || btn.textContent.trim() === expectedCancelText;
                if (isPending) {
                    setProfileButtonToCancel(btn, isProcessing);
                } else {
                    setProfileButtonToAdd(btn, isProcessing);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const currentWidth = btn.getBoundingClientRect().width;
                    if (currentWidth > 0) {
                        btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
                    }

                    const expectedCancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (btn.dataset.customProfileState === 'cancel' || btn.id.includes('PendingFriendRequest') || btn.textContent.trim() === expectedCancelText));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'pending');
                        const success = await cancelFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'none' : 'pending');
                    } else {
                        setUserState(targetUserId, 'none');
                        const success = await sendFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'pending' : 'none');
                    }
                });
            }
        });
    };

    const updateContextualMenuButtons = () => {
        const targetUserId = getTargetUserId();
        if (!targetUserId) return;

        const isFriend = document.querySelector('#user-profile-header-EditAlias, #user-profile-header-Chat, [data-testid="user-profile-header-friends"]');
        if (isFriend) {
            userStates.set(targetUserId, 'friends');
            return;
        }

        const menuItems = document.querySelectorAll('div[role="menu"] button[role="menuitem"], .foundation-web-menu button[role="menuitem"]');
        menuItems.forEach(btn => {
            const titleSpan = btn.querySelector('.foundation-web-menu-item-title') || btn.querySelector('span') || btn;
            const text = titleSpan.textContent.trim().toLowerCase();

            const isFriendMenuItem = btn.dataset.customMenuState ||
                text === 'pending' ||
                Object.values(REQUEST_SENT_TEXTS).some(t => text.includes(t.toLowerCase())) ||
                Object.values(PROFILE_CANCEL_REQUEST_TEXTS).some(t => text.includes(t.toLowerCase())) ||
                Object.values(PROFILE_ADD_FRIEND_TEXTS).some(t => text.includes(t.toLowerCase()));

            if (!isFriendMenuItem) return;

            let knownState = userStates.get(targetUserId);
            if (!knownState) {
                if (text === 'pending' || Object.values(REQUEST_SENT_TEXTS).some(t => text.includes(t.toLowerCase())) || Object.values(PROFILE_CANCEL_REQUEST_TEXTS).some(t => text.includes(t.toLowerCase()))) {
                    knownState = 'pending';
                    userStates.set(targetUserId, 'pending');
                } else {
                    knownState = 'none';
                    userStates.set(targetUserId, 'none');
                }
            }

            const isProcessing = processingUsers.has(targetUserId);

            if (knownState === 'pending') {
                const cancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                btn.dataset.customMenuState = 'cancel';
                btn.disabled = isProcessing;

                if (isProcessing) {
                    btn.style.setProperty('cursor', 'not-allowed', 'important');
                    btn.style.setProperty('pointer-events', 'none', 'important');
                    if (!titleSpan.querySelector('.foundation-web-progress-circle')) {
                        titleSpan.innerHTML = getSpinnerHtml();
                    }
                } else {
                    btn.style.setProperty('cursor', 'pointer', 'important');
                    btn.style.setProperty('pointer-events', 'auto', 'important');
                    if (titleSpan.textContent !== cancelText) {
                        titleSpan.textContent = cancelText;
                    }
                }
            } else if (knownState === 'none') {
                const addText = getTranslation(PROFILE_ADD_FRIEND_TEXTS);
                btn.dataset.customMenuState = 'add';
                btn.disabled = isProcessing;

                if (isProcessing) {
                    btn.style.setProperty('cursor', 'not-allowed', 'important');
                    btn.style.setProperty('pointer-events', 'none', 'important');
                    if (!titleSpan.querySelector('.foundation-web-progress-circle')) {
                        titleSpan.innerHTML = getSpinnerHtml();
                    }
                } else {
                    btn.style.setProperty('cursor', 'pointer', 'important');
                    btn.style.setProperty('pointer-events', 'auto', 'important');
                    if (titleSpan.textContent !== addText) {
                        titleSpan.textContent = addText;
                    }
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const expectedCancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS).toLowerCase();
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (btn.dataset.customMenuState === 'cancel' || text === 'pending' || text === expectedCancelText));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'pending');
                        const success = await cancelFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'none' : 'pending');
                    } else {
                        setUserState(targetUserId, 'none');
                        const success = await sendFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'pending' : 'none');
                    }
                });
            }
        });
    };

    const updateSearchButtons = () => {
        const btns = document.querySelectorAll('.player-search-actions button, button.player-search-action-parity, .avatar-card-btns button:not(.accept-friend):not(.ignore-friend), button[ng-if*="PendingOnOtherUser"], button[ng-if*="NoFriendship"]');
        btns.forEach(btn => {
            if (btn.classList.contains('accept-friend') || btn.classList.contains('ignore-friend') || btn.closest('.friends-content')) return;

            const targetUserId = getUserIdFromElement(btn);
            if (!targetUserId) return;

            const isProcessing = processingUsers.has(targetUserId);
            const knownState = userStates.get(targetUserId);

            if (knownState === 'pending') {
                setSearchButtonToCancel(btn, isProcessing);
            } else if (knownState === 'none') {
                setSearchButtonToAdd(btn, isProcessing);
            } else {
                const span = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span') || btn;
                const text = span.textContent.trim().toLowerCase();
                const isRequestSent = (btn.getAttribute('ng-if') && btn.getAttribute('ng-if').includes('PendingOnOtherUser')) || 
                                      Object.values(REQUEST_SENT_TEXTS).some(val => text.includes(val.toLowerCase())) ||
                                      Object.values(SEARCH_CANCEL_REQUEST_TEXTS).some(val => text.includes(val.toLowerCase())) ||
                                      Object.values(PROFILE_CANCEL_REQUEST_TEXTS).some(val => text.includes(val.toLowerCase()));

                if (isRequestSent) {
                    setSearchButtonToCancel(btn, isProcessing);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const currentWidth = btn.getBoundingClientRect().width;
                    if (currentWidth > 0) {
                        btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
                    }

                    const expectedCancelText = getTranslation(SEARCH_CANCEL_REQUEST_TEXTS).toLowerCase();
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (
                            btn.dataset.customSearchState === 'cancel' || 
                            btn.textContent.trim().toLowerCase() === expectedCancelText || 
                            btn.getAttribute('ng-if')?.includes('PendingOnOtherUser') ||
                            Object.values(REQUEST_SENT_TEXTS).some(val => btn.textContent.trim().toLowerCase().includes(val.toLowerCase()))
                        ));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'pending');
                        const success = await cancelFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'none' : 'pending');
                    } else {
                        setUserState(targetUserId, 'none');
                        const success = await sendFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'pending' : 'none');
                    }
                });
            }
        });
    };

    const updateActionButtons = () => {
        const btns = document.querySelectorAll('button[id="action-button-PendingFriendRequest"], button[id="action-button-AddFriend"]');
        btns.forEach(btn => {
            const targetUserId = getUserIdFromElement(btn);
            if (!targetUserId) return;

            const isProcessing = processingUsers.has(targetUserId);
            const knownState = userStates.get(targetUserId);

            if (knownState === 'pending') {
                setActionButtonToCancel(btn, isProcessing);
            } else if (knownState === 'none') {
                setActionButtonToAdd(btn, isProcessing);
            } else {
                const expectedCancelText = getTranslation(ACTION_CANCEL_TEXTS);
                const isPending = btn.id === 'action-button-PendingFriendRequest';

                if (isPending && btn.textContent.trim() !== expectedCancelText) {
                    setActionButtonToCancel(btn, isProcessing);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const currentWidth = btn.getBoundingClientRect().width;
                    if (currentWidth > 0) {
                        btn.style.setProperty('min-width', `${currentWidth}px`, 'important');
                    }

                    const expectedCancelText = getTranslation(ACTION_CANCEL_TEXTS);
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (btn.dataset.customActionState === 'cancel' || btn.id === 'action-button-PendingFriendRequest' || btn.textContent.trim() === expectedCancelText));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'pending');
                        const success = await cancelFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'none' : 'pending');
                    } else {
                        setUserState(targetUserId, 'none');
                        const success = await sendFriendRequest(targetUserId);
                        processingUsers.delete(targetUserId);
                        setUserState(targetUserId, success ? 'pending' : 'none');
                    }
                });
            }
        });
    };

    document.addEventListener('click', (e) => {
        const item = e.target.closest('button, a, [role="button"], [role="menuitem"], li');
        if (item) {
            const text = (item.textContent || '').trim().toLowerCase();
            const id = (item.id || '').toLowerCase();
            const testId = (item.getAttribute('data-testid') || '').toLowerCase();
            if (id.includes('unfriend') || testId.includes('unfriend') || text === 'unfriend' || text.includes('unfriend') || text === 'إلغاء الصداقة' || text.includes('إلغاء الصداقة')) {
                const targetUserId = getTargetUserId();
                if (targetUserId) {
                    setUserState(targetUserId, 'none');
                }
            }
        }
    }, true);

    let isUpdating = false;
    const updateAll = () => {
        if (isUpdating) return;
        isUpdating = true;
        updateProfileButton();
        updateContextualMenuButtons();
        updateSearchButtons();
        updateActionButtons();
        isUpdating = false;
    };

    let frameId = null;
    const scheduleUpdate = () => {
        if (frameId) return;
        frameId = requestAnimationFrame(() => {
            frameId = null;
            updateAll();
        });
    };

    injectStyles();

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['class', 'data-theme'] 
    });

    scheduleUpdate();
})();