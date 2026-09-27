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
        pt: "Cancelar solicitação",
        vi: "Hủy yêu cầu",
        tr: "İsteği İptal Et",
        hi: "अनुरोध रद्द करें",
        th: "ยกเลิกคำขอ",
        zh: "取消请求",
        zh_cn: "取消请求",
        zh_tw: "取消請求",
        zh_hans: "取消请求",
        zh_hant: "取消請求",
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
        bg: "Отказ на заявката",
        ru: "Отменить запрос",
        kk: "Сұранысты жою",
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
        id: "Permintaan terkirim",
        de: "Anfrage gesendet",
        es: "Solicitud enviada",
        fr: "Demande envoyée",
        it: "Richiesta inviata",
        pl: "Wysłano prośbę",
        pt: "Solicitação enviada",
        vi: "Đã gửi yêu cầu",
        tr: "İstek gönderildi",
        hi: "अनुरोध भेजा गया",
        th: "ส่งคำขอแล้ว",
        zh: "已发送请求",
        zh_cn: "已发送请求",
        zh_tw: "已傳送請求",
        zh_hans: "已发送请求",
        zh_hant: "已傳送請求",
        ja: "リクエストを送信しました",
        ko: "요청 전송됨",
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
        sl: "Zahteva je poslana",
        sk: "Žiadosť bola odoslaná",
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
        id: "Batal",
        de: "Abbrechen",
        es: "Cancelar",
        fr: "Annuler",
        it: "Annulla",
        pl: "Anuluj",
        pt: "Cancelar",
        vi: "Hủy",
        tr: "İptal",
        hi: "रद्द करें",
        th: "ยกเลิก",
        zh: "取消",
        zh_cn: "取消",
        zh_tw: "取消",
        zh_hans: "取消",
        zh_hant: "取消",
        ja: "キャンセル",
        ko: "취소하기",
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
        return code;
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
        const res = await fetch('https://auth.roblox.com/v2/login', {
            method: 'POST',
            credentials: 'include'
        });
        return res.headers.get('x-csrf-token') || '';
    };

    const sendRequest = async (url, options = {}) => {
        let res = await fetch(url, options);
        if (res.status === 403) {
            const token = res.headers.get('x-csrf-token');
            if (token) {
                options.headers = options.headers || {};
                options.headers['X-CSRF-TOKEN'] = token;
                res = await fetch(url, options);
            }
        }
        return res;
    };

    const cancelFriendRequest = async (targetUserId) => {
        const csrf = await getCsrfToken();
        const res = await sendRequest(`https://friends.roblox.com/v1/users/${targetUserId}/unfriend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf
            },
            credentials: 'include'
        });
        return res.ok;
    };

    const sendFriendRequest = async (targetUserId) => {
        const csrf = await getCsrfToken();
        const res = await sendRequest(`https://friends.roblox.com/v1/users/${targetUserId}/request-friendship`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': csrf
            },
            body: JSON.stringify({ friendshipOriginSourceType: 0 }),
            credentials: 'include'
        });
        return res.ok;
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

    const setProfileButtonToAdd = (btn) => {
        const expectedText = getTranslation(PROFILE_ADD_FRIEND_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span');
        if (btn.dataset.customProfileState === 'add' && textSpan && textSpan.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customProfileState = 'add';
        btn.id = 'user-profile-header-AddFriend';
        btn.disabled = false;
        btn.removeAttribute('disabled');
        btn.removeAttribute('aria-disabled');
        btn.classList.remove('opacity-[0.5]');
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');

        const hasJoin = document.getElementById('user-profile-header-JoinExperience') || btn.parentElement?.querySelector('#user-profile-header-JoinExperience');
        if (hasJoin) {
            btn.classList.remove('bg-action-emphasis', 'content-action-emphasis');
            btn.classList.add('bg-action-standard', 'content-action-standard');
        } else {
            btn.classList.remove('bg-action-standard', 'content-action-standard');
            btn.classList.add('bg-action-emphasis', 'content-action-emphasis');
        }

        if (textSpan && textSpan.textContent !== expectedText) {
            textSpan.textContent = expectedText;
        }
    };

    const setProfileButtonToCancel = (btn) => {
        const expectedText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span');
        if (btn.dataset.customProfileState === 'cancel' && textSpan && textSpan.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customProfileState = 'cancel';
        btn.id = 'user-profile-header-PendingFriendRequest';
        btn.disabled = false;
        btn.removeAttribute('disabled');
        btn.removeAttribute('aria-disabled');
        btn.classList.remove('opacity-[0.5]');
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');
        btn.classList.remove('bg-action-emphasis', 'content-action-emphasis');
        btn.classList.add('bg-action-standard', 'content-action-standard');

        if (textSpan && textSpan.textContent !== expectedText) {
            textSpan.textContent = expectedText;
        }
    };

    const setSearchButtonToAdd = (btn) => {
        const expectedText = getTranslation(SEARCH_ADD_FRIEND_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span');
        if (btn.dataset.customSearchState === 'add' && textSpan && textSpan.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customSearchState = 'add';
        btn.disabled = false;
        btn.removeAttribute('disabled');
        btn.removeAttribute('aria-disabled');
        btn.classList.remove('opacity-[0.5]');
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');

        if (btn.classList.contains('foundation-web-button') || btn.closest('.player-search-actions')) {
            btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer relative flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard width-full player-search-action-parity';
        } else if (!btn.className.includes('btn-control-md')) {
            btn.className = 'btn-control-md full-size ng-scope';
        }

        if (textSpan && textSpan.textContent !== expectedText) {
            textSpan.textContent = expectedText;
        }
    };

    const setSearchButtonToCancel = (btn) => {
        const expectedText = getTranslation(SEARCH_CANCEL_REQUEST_TEXTS);
        const textSpan = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span');
        if (btn.dataset.customSearchState === 'cancel' && textSpan && textSpan.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customSearchState = 'cancel';
        btn.disabled = false;
        btn.removeAttribute('disabled');
        btn.removeAttribute('aria-disabled');
        btn.classList.remove('opacity-[0.5]');
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');

        if (btn.classList.contains('foundation-web-button') || btn.closest('.player-search-actions')) {
            btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer relative flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard width-full player-search-action-parity';
        } else if (!btn.className.includes('btn-control-md')) {
            btn.className = 'btn-control-md full-size ng-scope';
        }

        if (textSpan && textSpan.textContent !== expectedText) {
            textSpan.textContent = expectedText;
        }
    };

    const setActionButtonToAdd = (btn) => {
        const expectedText = getTranslation(ACTION_ADD_TEXTS);
        const span = btn.querySelector('span.padding-y-xsmall') || btn.querySelector('span');
        if (btn.dataset.customActionState === 'add' && span && span.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customActionState = 'add';
        btn.id = 'action-button-AddFriend';
        btn.setAttribute('aria-disabled', 'false');
        btn.removeAttribute('disabled');
        btn.disabled = false;
        btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-emphasis content-action-emphasis shrink-0 margin-right-medium';
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');
        if (span && span.textContent !== expectedText) {
            span.textContent = expectedText;
        }
    };

    const setActionButtonToCancel = (btn) => {
        const expectedText = getTranslation(ACTION_CANCEL_TEXTS);
        const span = btn.querySelector('span.padding-y-xsmall') || btn.querySelector('span');
        if (btn.dataset.customActionState === 'cancel' && span && span.textContent === expectedText && !btn.hasAttribute('disabled')) {
            return;
        }

        btn.dataset.customActionState = 'cancel';
        btn.id = 'action-button-PendingFriendRequest';
        btn.setAttribute('aria-disabled', 'false');
        btn.removeAttribute('disabled');
        btn.disabled = false;
        btn.className = 'foundation-web-button relative clip group/interactable focus-visible:outline-focus disabled:outline-none cursor-pointer flex items-center justify-center stroke-none padding-y-none select-none radius-medium text-label-medium height-1000 padding-x-medium bg-action-standard content-action-standard shrink-0 margin-right-medium';
        btn.style.setProperty('opacity', '1', 'important');
        btn.style.setProperty('cursor', 'pointer', 'important');
        btn.style.setProperty('pointer-events', 'auto', 'important');
        if (span && span.textContent !== expectedText) {
            span.textContent = expectedText;
        }
    };

    const setUserState = (userId, state) => {
        userStates.set(userId, state);

        if (getTargetUserId() === userId) {
            const profileBtns = document.querySelectorAll('#user-profile-header-PendingFriendRequest, #user-profile-header-AddFriend, button[id*="PendingFriendRequest"], button[id*="AddFriend"]');
            profileBtns.forEach(btn => {
                if (state === 'pending') {
                    setProfileButtonToCancel(btn);
                } else if (state === 'none') {
                    setProfileButtonToAdd(btn);
                }
            });
        }

        const searchBtns = document.querySelectorAll('.avatar-card-btns button, button[ng-if*="PendingOnOtherUser"], button[ng-if*="NoFriendship"], .player-search-actions button, button.player-search-action-parity');
        searchBtns.forEach(btn => {
            if (getUserIdFromElement(btn) === userId) {
                if (state === 'pending') {
                    setSearchButtonToCancel(btn);
                } else {
                    setSearchButtonToAdd(btn);
                }
            }
        });

        const actionBtns = document.querySelectorAll('button[id="action-button-PendingFriendRequest"], button[id="action-button-AddFriend"]');
        actionBtns.forEach(btn => {
            if (getUserIdFromElement(btn) === userId) {
                if (state === 'pending') {
                    setActionButtonToCancel(btn);
                } else {
                    setActionButtonToAdd(btn);
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

            if (knownState === 'pending') {
                setProfileButtonToCancel(btn);
            } else if (knownState === 'none') {
                setProfileButtonToAdd(btn);
            } else {
                const expectedCancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                const isPending = btn.id.includes('PendingFriendRequest') || btn.textContent.trim() === 'Pending' || btn.textContent.trim() === expectedCancelText;
                if (isPending) {
                    setProfileButtonToCancel(btn);
                } else {
                    setProfileButtonToAdd(btn);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const expectedCancelText = getTranslation(PROFILE_CANCEL_REQUEST_TEXTS);
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (btn.dataset.customProfileState === 'cancel' || btn.id.includes('PendingFriendRequest') || btn.textContent.trim() === expectedCancelText));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'none');
                        const success = await cancelFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'pending');
                        }
                    } else {
                        setUserState(targetUserId, 'pending');
                        const success = await sendFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'none');
                        }
                    }

                    processingUsers.delete(targetUserId);
                });
            }
        });
    };

    const updateSearchButtons = () => {
        const btns = document.querySelectorAll('.avatar-card-btns button, button[ng-if*="PendingOnOtherUser"], button[ng-if*="NoFriendship"], .player-search-actions button, button.player-search-action-parity');
        btns.forEach(btn => {
            const targetUserId = getUserIdFromElement(btn);
            if (!targetUserId) return;

            const knownState = userStates.get(targetUserId);
            if (knownState === 'pending') {
                setSearchButtonToCancel(btn);
            } else if (knownState === 'none') {
                setSearchButtonToAdd(btn);
            } else {
                const span = btn.querySelector('.text-truncate-end') || btn.querySelector('span span') || btn.querySelector('span');
                const text = (span ? span.textContent : btn.textContent).trim().toLowerCase();
                const isRequestSent = (btn.getAttribute('ng-if') && btn.getAttribute('ng-if').includes('PendingOnOtherUser')) || 
                                      btn.hasAttribute('disabled') || 
                                      btn.disabled || 
                                      Object.values(REQUEST_SENT_TEXTS).some(val => text.includes(val.toLowerCase())) ||
                                      Object.values(SEARCH_CANCEL_REQUEST_TEXTS).some(val => text.includes(val.toLowerCase())) ||
                                      Object.values(PROFILE_CANCEL_REQUEST_TEXTS).some(val => text.includes(val.toLowerCase()));

                if (isRequestSent) {
                    setSearchButtonToCancel(btn);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const expectedCancelText = getTranslation(SEARCH_CANCEL_REQUEST_TEXTS).toLowerCase();
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (
                            btn.dataset.customSearchState === 'cancel' || 
                            btn.textContent.trim().toLowerCase() === expectedCancelText || 
                            btn.getAttribute('ng-if')?.includes('PendingOnOtherUser') ||
                            Object.values(REQUEST_SENT_TEXTS).some(val => btn.textContent.trim().toLowerCase().includes(val.toLowerCase()))
                        ));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'none');
                        const success = await cancelFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'pending');
                        }
                    } else {
                        setUserState(targetUserId, 'pending');
                        const success = await sendFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'none');
                        }
                    }

                    processingUsers.delete(targetUserId);
                });
            }
        });
    };

    const updateActionButtons = () => {
        const btns = document.querySelectorAll('button[id="action-button-PendingFriendRequest"], button[id="action-button-AddFriend"]');
        btns.forEach(btn => {
            const targetUserId = getUserIdFromElement(btn);
            if (!targetUserId) return;

            const knownState = userStates.get(targetUserId);
            if (knownState === 'pending') {
                setActionButtonToCancel(btn);
            } else if (knownState === 'none') {
                setActionButtonToAdd(btn);
            } else {
                const expectedCancelText = getTranslation(ACTION_CANCEL_TEXTS);
                const isPending = btn.id === 'action-button-PendingFriendRequest';

                if (isPending && btn.textContent.trim() !== expectedCancelText) {
                    setActionButtonToCancel(btn);
                }
            }

            if (!btn.dataset.customManaged) {
                btn.dataset.customManaged = 'true';

                btn.addEventListener('click', async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (processingUsers.has(targetUserId)) return;
                    processingUsers.add(targetUserId);

                    const expectedCancelText = getTranslation(ACTION_CANCEL_TEXTS);
                    const currentIsPending = (userStates.get(targetUserId) === 'pending') ||
                        (!userStates.has(targetUserId) && (btn.dataset.customActionState === 'cancel' || btn.id === 'action-button-PendingFriendRequest' || btn.textContent.trim() === expectedCancelText));

                    if (currentIsPending) {
                        setUserState(targetUserId, 'none');
                        const success = await cancelFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'pending');
                        }
                    } else {
                        setUserState(targetUserId, 'pending');
                        const success = await sendFriendRequest(targetUserId);
                        if (!success) {
                            setUserState(targetUserId, 'none');
                        }
                    }

                    processingUsers.delete(targetUserId);
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

    const observer = new MutationObserver(scheduleUpdate);
    observer.observe(document.body, { 
        childList: true, 
        subtree: true, 
        attributes: true, 
        attributeFilter: ['class', 'data-theme'] 
    });

    scheduleUpdate();
})();