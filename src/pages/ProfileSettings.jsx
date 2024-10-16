import { useEffect, useState } from 'react';
import unitedStates from '../assets/united-states.png';
import spain from '../assets/spain.png';
import india from '../assets/india.png';
import { GoChevronRight } from "react-icons/go";
import { TbLoader2 } from "react-icons/tb";
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../utils/supabase';

export default function ProfileSettings() {
    const [languageSelectOpen, setLanguageSelectOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState(["English", "en"]);

    const [currencySelectOpen, setCurrencySelectOpen] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState("USD");

    const [userData, setUserData] = useState(undefined);

    async function collectUserData() {
        const currentUser = await supabase.auth.getUser();
        const { data, error } = await supabase.from('users').select('*').eq('id', currentUser.data.user.id);

        setUserData(data[0]);
        setSelectedLanguage(data[0].language);
        setSelectedCurrency(data[0].currency);
        console.log("SOMETTHIGN:", data[0]);
    }

    useEffect(() => {
        collectUserData();
    }, []);

    async function toggleCategory(categoryName) {
        const { data, error } = await supabase.from('users').update({ [categoryName]: !userData[categoryName] }).eq('id', userData.id).select();
        
        collectUserData();
    }

    const languageData = [
        {
            name: "English",
            image: unitedStates,
            code: 'en',
        },
        {
            name: "Spanish",
            image: spain,
            code: 'es',
        },
        {
            name: "Telugu",
            image: india,
            code: 'tel',
        }
    ]
    const currencyData = [
        {
            name: "USD",
            image: unitedStates,
        },
        {
            name: "EUR",
            image: spain,
        },
        {
            name: "INR",
            image: india,
        }
    ]

    const notificationSettings = [
        {
            name: 'trade_executed',
            title: 'Trade Executed',
            description: 'Receive notifications when a trade has been completed.',
            category: 'trades',
        },
        {
            name: 'trade_rejected',
            title: 'Trade Rejected',
            description: 'Receive notifications when a trade order fails',
            category: 'trades',
        },
        {
            name: 'trade_placed',
            title: 'Trade Placed',
            description: 'Receive notifications when a trade has been placed.',
            category: 'trades',
        },
        {
            name: 'trade_recommendations',
            title: 'Trade Recommendations',
            description: 'Receive trade suggestions based on market analysis.',
            category: 'trades',
        },
        {
            name: 'market_opening',
            title: 'Market Open',
            description: 'Receive notifications 15 minutes before the market opens.',
            category: 'market',
        },
        {
            name: 'market_closing',
            title: 'Market Close',
            description: 'Receive notifications 15 minutes before the market closes.',
            category: 'market',
        },
        {
            name: 'price_change',
            title: 'Significant Price Change',
            description: 'Receive notifications when a stock in your portfolio has a significant price movement.',
            category: 'market',
        },
        {
            name: 'market_news',
            title: 'Market News',
            description: 'Receive breaking news that may impact the market.',
            category: 'market',
        },
        {
            name: 'daily_summary',
            title: 'Daily Portfolio Summary',
            description: 'Receive a daily summary of your portfolio performance, including gains and losses after the market closes.',
            category: 'portfolio',
        },
        {
            name: 'weekly_summary',
            title: 'Weekly Portfolio Summary',
            description: 'Receive a weekly summary of your portfolio performance, including gains and losses every Friday after the market closes.',
            category: 'portfolio',
        },
        {
            name: 'dividend_received',
            title: 'Dividend Received',
            description: 'Receive notifications when a dividend is paid out on a stock in your portfolio.',
            category: 'portfolio',
        },
        {
            name: 'rebalancing_suggestion',
            title: 'Portfolio Rebalancing Suggestion',
            description: 'Receive suggestions for rebalancing your portfolio based on market trends.',
            category: 'portfolio',
        },
        {
            name: 'stock_price_change',
            title: 'Stock Price Change',
            description: 'Receive notificartions when an alert condition from the alerts page is hit.',
            category: 'watchlist',
        },
        {
            name: 'watchlist_news_daily',
            title: 'Watchlist News',
            description: 'Receive daily news about stocks in your watchlist after the market closes.',
            category: 'watchlist',
        },
        {
            name: 'watchlist_news_weekly',
            title: 'Watchlist News',
            description: 'Receive weekly news about stocks in your watchlist every Friday after the market closes.',
            category: 'watchlist',
        },
        {
            name: 'login_alerts',
            title: 'Unknown Login',
            description: 'Receive alerts from login attempts from new devices or locations.',
            category: 'account',
        },
        {
            name: 'profile_changes',
            title: 'Profile Changes',
            description: 'Receive alerts when your profile is updated, such as email or password changes.',
            category: 'account',
        },
        {
            name: 'new_features',
            title: 'New Features',
            description: 'Receive notifications when new tools, resources, or features in the app are announced.',
            category: 'promotions',
        },
        {
            name: 'comps',
            title: 'Competitions',
            description: 'Receive notifications about upcoming contests, games, or challenges related to trading.',
            category: 'promotions',
        },
        {
            name: 'market_education',
            title: 'Market Education',
            description: 'Receive notifcations about tips, guides, and educational content on market trends, investing startegies, and more.',
            category: 'educational',
        },
        {
            name: 'webinars_events',
            title: 'Webinars and Events',
            description: 'Receive invitations to webinars, workshops, or live market discussions.',
            category: 'educational',
        },
    ]

    return (
        <div className={`bg-base-300 p-10 flex-1 2xl:w-2/3 2xl:mx-auto`}>
            {userData ? (
                <motion.div initial="hidden" animate="show" variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.01 } } }}>
                    <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`text-base-content mb-1.5`}>Language</motion.p>
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`relative w-1/2 mb-2.5`}>
                        <img onClick={() => setLanguageSelectOpen(!languageSelectOpen)} src={languageData.find(val => val.name === selectedLanguage[0]).image} alt='United States' className={`w-5 aspect-square cursor-pointer rounded-full absolute top-3 start-2.5`} />
                        {/* SPAIN <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#f1c142" d="M1 10H31V22H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v3H1v-3c0-2.208,1.792-4,4-4Z" fill="#a0251e"></path><path d="M5,21H27c2.208,0,4,1.792,4,4v3H1v-3c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24.5)" fill="#a0251e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path d="M12.614,13.091c.066-.031,.055-.14-.016-.157,.057-.047,.02-.15-.055-.148,.04-.057-.012-.144-.082-.13,.021-.062-.042-.127-.104-.105,.01-.068-.071-.119-.127-.081,.004-.068-.081-.112-.134-.069-.01-.071-.11-.095-.15-.035-.014-.068-.111-.087-.149-.028-.027-.055-.114-.057-.144-.004-.03-.047-.107-.045-.136,.002-.018-.028-.057-.044-.09-.034,.009-.065-.066-.115-.122-.082,.002-.07-.087-.111-.138-.064-.013-.064-.103-.087-.144-.036-.02-.063-.114-.075-.148-.017-.036-.056-.129-.042-.147,.022-.041-.055-.135-.031-.146,.036-.011-.008-.023-.014-.037-.016,.006-.008,.01-.016,.015-.025h.002c.058-.107,.004-.256-.106-.298v-.098h.099v-.154h-.099v-.101h-.151v.101h-.099v.154h.099v.096c-.113,.04-.169,.191-.11,.299h.002c.004,.008,.009,.017,.014,.024-.015,.002-.029,.008-.04,.017-.011-.067-.106-.091-.146-.036-.018-.064-.111-.078-.147-.022-.034-.057-.128-.046-.148,.017-.041-.052-.131-.028-.144,.036-.051-.047-.139-.006-.138,.064-.056-.033-.131,.017-.122,.082-.034-.01-.072,.006-.091,.034-.029-.047-.106-.049-.136-.002-.03-.054-.117-.051-.143,.004-.037-.059-.135-.04-.149,.028-.039-.06-.14-.037-.15,.035-.053-.043-.138,0-.134,.069-.056-.038-.137,.013-.127,.081-.062-.021-.125,.044-.104,.105-.05-.009-.096,.033-.096,.084h0c0,.017,.005,.033,.014,.047-.075-.002-.111,.101-.055,.148-.071,.017-.082,.125-.016,.157-.061,.035-.047,.138,.022,.154-.013,.015-.021,.034-.021,.055h0c0,.042,.03,.077,.069,.084-.023,.048,.009,.11,.06,.118-.013,.03-.012,.073-.012,.106,.09-.019,.2,.006,.239,.11-.015,.068,.065,.156,.138,.146,.06,.085,.133,.165,.251,.197-.021,.093,.064,.093,.123,.118-.013,.016-.043,.063-.055,.081,.024,.013,.087,.041,.113,.051,.005,.019,.004,.028,.004,.031,.091,.501,2.534,.502,2.616-.001v-.002s.004,.003,.004,.004c0-.003-.001-.011,.004-.031l.118-.042-.062-.09c.056-.028,.145-.025,.123-.119,.119-.032,.193-.112,.253-.198,.073,.01,.153-.078,.138-.146,.039-.104,.15-.129,.239-.11,0-.035,.002-.078-.013-.109,.044-.014,.07-.071,.049-.115,.062-.009,.091-.093,.048-.139,.069-.016,.083-.12,.022-.154Zm-.296-.114c0,.049-.012,.098-.034,.141-.198-.137-.477-.238-.694-.214-.002-.009-.006-.017-.011-.024,0,0,0-.001,0-.002,.064-.021,.074-.12,.015-.153,0,0,0,0,0,0,.048-.032,.045-.113-.005-.141,.328-.039,.728,.09,.728,.393Zm-.956-.275c0,.063-.02,.124-.054,.175-.274-.059-.412-.169-.717-.185-.007-.082-.005-.171-.011-.254,.246-.19,.81-.062,.783,.264Zm-1.191-.164c-.002,.05-.003,.102-.007,.151-.302,.013-.449,.122-.719,.185-.26-.406,.415-.676,.73-.436-.002,.033-.005,.067-.004,.101Zm-1.046,.117c0,.028,.014,.053,.034,.069,0,0,0,0,0,0-.058,.033-.049,.132,.015,.152,0,0,0,.001,0,.002-.005,.007-.008,.015-.011,.024-.219-.024-.495,.067-.698,.206-.155-.377,.323-.576,.698-.525-.023,.015-.039,.041-.039,.072Zm3.065-.115s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0,0Zm-3.113,1.798v.002s-.002,0-.003,.002c0-.001,.002-.003,.003-.003Z" fill="#9b8028"></path><path d="M14.133,16.856c.275-.65,.201-.508-.319-.787v-.873c.149-.099-.094-.121,.05-.235h.072v-.339h-.99v.339h.075c.136,.102-.091,.146,.05,.235v.76c-.524-.007-.771,.066-.679,.576h.039s0,0,0,0l.016,.036c.14-.063,.372-.107,.624-.119v.224c-.384,.029-.42,.608,0,.8v1.291c-.053,.017-.069,.089-.024,.123,.007,.065-.058,.092-.113,.083,0,.026,0,.237,0,.269-.044,.024-.113,.03-.17,.028v.108s0,0,0,0v.107s0,0,0,0v.107s0,0,0,0v.108s0,0,0,0v.186c.459-.068,.895-.068,1.353,0v-.616c-.057,.002-.124-.004-.17-.028,0-.033,0-.241,0-.268-.054,.008-.118-.017-.113-.081,.048-.033,.034-.108-.021-.126v-.932c.038,.017,.073,.035,.105,.053-.105,.119-.092,.326,.031,.429l.057-.053c.222-.329,.396-.743-.193-.896v-.35c.177-.019,.289-.074,.319-.158Z" fill="#9b8028"></path><path d="M8.36,16.058c-.153-.062-.39-.098-.653-.102v-.76c.094-.041,.034-.115-.013-.159,.02-.038,.092-.057,.056-.115h.043v-.261h-.912v.261h.039c-.037,.059,.039,.078,.057,.115-.047,.042-.108,.118-.014,.159v.873c-.644,.133-.611,.748,0,.945v.35c-.59,.154-.415,.567-.193,.896l.057,.053c.123-.103,.136-.31,.031-.429,.032-.018,.067-.036,.105-.053v.932c-.055,.018-.069,.093-.021,.126,.005,.064-.059,.089-.113,.081,0,.026,0,.236,0,.268-.045,.024-.113,.031-.17,.028v.401h0v.215c.459-.068,.895-.068,1.352,0v-.186s0,0,0,0v-.108s0,0,0,0v-.107s0,0,0,0v-.107s0,0,0,0v-.108c-.056,.002-.124-.004-.169-.028,0-.033,0-.241,0-.269-.055,.008-.119-.018-.113-.083,.045-.034,.03-.107-.024-.124v-1.29c.421-.192,.383-.772,0-.8v-.224c.575,.035,.796,.314,.653-.392Z" fill="#9b8028"></path><path d="M12.531,14.533h-4.28l.003,2.572v1.485c0,.432,.226,.822,.591,1.019,.473,.252,1.024,.391,1.552,.391s1.064-.135,1.544-.391c.364-.197,.591-.587,.591-1.019v-4.057Z" fill="#a0251e"></path></svg> */}
                        <p onClick={() => setLanguageSelectOpen(!languageSelectOpen)} className={`pl-10 px-4 py-2 rounded-md border border-neutral w-full cursor-pointer hover:border-base-200 hover:shadow-lg transition-all ease-in-out duration-200`}>{selectedLanguage[0]}</p>
                        {!languageSelectOpen ? <GoChevronRight onClick={() => setLanguageSelectOpen(!languageSelectOpen)} size={22} className={`absolute cursor-pointer inset transition-all ease-in-out duration-150 bottom-2.5 end-2.5`} /> : <GoChevronRight onClick={() => setLanguageSelectOpen(!languageSelectOpen)} size={22} className={`absolute cursor-pointer rotate-90 transition-all ease-in-out duration-150 inset bottom-2.5 end-2.5`} />}
                        <AnimatePresence>
                            {languageSelectOpen && (
                                <motion.div key={languageSelectOpen} initial={{ opacity: 0, y: 20, visibility: "hidden" }} animate={{ opacity: 1, y: 0, visibility: "visible" }} exit={{ opacity: 0, y: -20, visibility: "hidden" }} transition={{ type: "spring", duration: 0.6 }} className={`w-full z-[100] absolute mt-3 shadow-xl rounded-md border border-neutral bg-base-300 bg-opacity-100`}>
                                    {languageData.filter(language => language.name !== selectedLanguage[0]).map((option, index) => {
                                        return (
                                            <div onClick={() => {setSelectedLanguage([option.name, option.code]); setLanguageSelectOpen(false);}} key={index} className={`flex items-center gap-2 py-2 px-2.5 hover:bg-neutral hover:bg-opacity-40 transition-all duration-200 ease-in-out cursor-pointer`}>
                                                <img src={option.image} alt={option.name} className={`w-5 aspect-square rounded-full`} />
                                                <p className={`text-base-content`}>{option.name} ({option.code.toUpperCase()})</p>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.p variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`text-base-content mb-1.5`}>Currency</motion.p>
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`relative w-1/2 mb-10 z-50`}>
                        <img onClick={() => setCurrencySelectOpen(!currencySelectOpen)} src={currencyData.find(val => val.name === selectedCurrency).image} alt='United States' className={`w-5 z-[99] aspect-square cursor-pointer rounded-full absolute top-3 start-2.5`} />
                        {/* SPAIN <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#f1c142" d="M1 10H31V22H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v3H1v-3c0-2.208,1.792-4,4-4Z" fill="#a0251e"></path><path d="M5,21H27c2.208,0,4,1.792,4,4v3H1v-3c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24.5)" fill="#a0251e"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path d="M12.614,13.091c.066-.031,.055-.14-.016-.157,.057-.047,.02-.15-.055-.148,.04-.057-.012-.144-.082-.13,.021-.062-.042-.127-.104-.105,.01-.068-.071-.119-.127-.081,.004-.068-.081-.112-.134-.069-.01-.071-.11-.095-.15-.035-.014-.068-.111-.087-.149-.028-.027-.055-.114-.057-.144-.004-.03-.047-.107-.045-.136,.002-.018-.028-.057-.044-.09-.034,.009-.065-.066-.115-.122-.082,.002-.07-.087-.111-.138-.064-.013-.064-.103-.087-.144-.036-.02-.063-.114-.075-.148-.017-.036-.056-.129-.042-.147,.022-.041-.055-.135-.031-.146,.036-.011-.008-.023-.014-.037-.016,.006-.008,.01-.016,.015-.025h.002c.058-.107,.004-.256-.106-.298v-.098h.099v-.154h-.099v-.101h-.151v.101h-.099v.154h.099v.096c-.113,.04-.169,.191-.11,.299h.002c.004,.008,.009,.017,.014,.024-.015,.002-.029,.008-.04,.017-.011-.067-.106-.091-.146-.036-.018-.064-.111-.078-.147-.022-.034-.057-.128-.046-.148,.017-.041-.052-.131-.028-.144,.036-.051-.047-.139-.006-.138,.064-.056-.033-.131,.017-.122,.082-.034-.01-.072,.006-.091,.034-.029-.047-.106-.049-.136-.002-.03-.054-.117-.051-.143,.004-.037-.059-.135-.04-.149,.028-.039-.06-.14-.037-.15,.035-.053-.043-.138,0-.134,.069-.056-.038-.137,.013-.127,.081-.062-.021-.125,.044-.104,.105-.05-.009-.096,.033-.096,.084h0c0,.017,.005,.033,.014,.047-.075-.002-.111,.101-.055,.148-.071,.017-.082,.125-.016,.157-.061,.035-.047,.138,.022,.154-.013,.015-.021,.034-.021,.055h0c0,.042,.03,.077,.069,.084-.023,.048,.009,.11,.06,.118-.013,.03-.012,.073-.012,.106,.09-.019,.2,.006,.239,.11-.015,.068,.065,.156,.138,.146,.06,.085,.133,.165,.251,.197-.021,.093,.064,.093,.123,.118-.013,.016-.043,.063-.055,.081,.024,.013,.087,.041,.113,.051,.005,.019,.004,.028,.004,.031,.091,.501,2.534,.502,2.616-.001v-.002s.004,.003,.004,.004c0-.003-.001-.011,.004-.031l.118-.042-.062-.09c.056-.028,.145-.025,.123-.119,.119-.032,.193-.112,.253-.198,.073,.01,.153-.078,.138-.146,.039-.104,.15-.129,.239-.11,0-.035,.002-.078-.013-.109,.044-.014,.07-.071,.049-.115,.062-.009,.091-.093,.048-.139,.069-.016,.083-.12,.022-.154Zm-.296-.114c0,.049-.012,.098-.034,.141-.198-.137-.477-.238-.694-.214-.002-.009-.006-.017-.011-.024,0,0,0-.001,0-.002,.064-.021,.074-.12,.015-.153,0,0,0,0,0,0,.048-.032,.045-.113-.005-.141,.328-.039,.728,.09,.728,.393Zm-.956-.275c0,.063-.02,.124-.054,.175-.274-.059-.412-.169-.717-.185-.007-.082-.005-.171-.011-.254,.246-.19,.81-.062,.783,.264Zm-1.191-.164c-.002,.05-.003,.102-.007,.151-.302,.013-.449,.122-.719,.185-.26-.406,.415-.676,.73-.436-.002,.033-.005,.067-.004,.101Zm-1.046,.117c0,.028,.014,.053,.034,.069,0,0,0,0,0,0-.058,.033-.049,.132,.015,.152,0,0,0,.001,0,.002-.005,.007-.008,.015-.011,.024-.219-.024-.495,.067-.698,.206-.155-.377,.323-.576,.698-.525-.023,.015-.039,.041-.039,.072Zm3.065-.115s0,0,0,0c0,0,0,0,0,0,0,0,0,0,0,0Zm-3.113,1.798v.002s-.002,0-.003,.002c0-.001,.002-.003,.003-.003Z" fill="#9b8028"></path><path d="M14.133,16.856c.275-.65,.201-.508-.319-.787v-.873c.149-.099-.094-.121,.05-.235h.072v-.339h-.99v.339h.075c.136,.102-.091,.146,.05,.235v.76c-.524-.007-.771,.066-.679,.576h.039s0,0,0,0l.016,.036c.14-.063,.372-.107,.624-.119v.224c-.384,.029-.42,.608,0,.8v1.291c-.053,.017-.069,.089-.024,.123,.007,.065-.058,.092-.113,.083,0,.026,0,.237,0,.269-.044,.024-.113,.03-.17,.028v.108s0,0,0,0v.107s0,0,0,0v.107s0,0,0,0v.108s0,0,0,0v.186c.459-.068,.895-.068,1.353,0v-.616c-.057,.002-.124-.004-.17-.028,0-.033,0-.241,0-.268-.054,.008-.118-.017-.113-.081,.048-.033,.034-.108-.021-.126v-.932c.038,.017,.073,.035,.105,.053-.105,.119-.092,.326,.031,.429l.057-.053c.222-.329,.396-.743-.193-.896v-.35c.177-.019,.289-.074,.319-.158Z" fill="#9b8028"></path><path d="M8.36,16.058c-.153-.062-.39-.098-.653-.102v-.76c.094-.041,.034-.115-.013-.159,.02-.038,.092-.057,.056-.115h.043v-.261h-.912v.261h.039c-.037,.059,.039,.078,.057,.115-.047,.042-.108,.118-.014,.159v.873c-.644,.133-.611,.748,0,.945v.35c-.59,.154-.415,.567-.193,.896l.057,.053c.123-.103,.136-.31,.031-.429,.032-.018,.067-.036,.105-.053v.932c-.055,.018-.069,.093-.021,.126,.005,.064-.059,.089-.113,.081,0,.026,0,.236,0,.268-.045,.024-.113,.031-.17,.028v.401h0v.215c.459-.068,.895-.068,1.352,0v-.186s0,0,0,0v-.108s0,0,0,0v-.107s0,0,0,0v-.107s0,0,0,0v-.108c-.056,.002-.124-.004-.169-.028,0-.033,0-.241,0-.269-.055,.008-.119-.018-.113-.083,.045-.034,.03-.107-.024-.124v-1.29c.421-.192,.383-.772,0-.8v-.224c.575,.035,.796,.314,.653-.392Z" fill="#9b8028"></path><path d="M12.531,14.533h-4.28l.003,2.572v1.485c0,.432,.226,.822,.591,1.019,.473,.252,1.024,.391,1.552,.391s1.064-.135,1.544-.391c.364-.197,.591-.587,.591-1.019v-4.057Z" fill="#a0251e"></path></svg> */}
                        <p onClick={() => setCurrencySelectOpen(!currencySelectOpen)} className={`pl-10 px-4 py-2 rounded-md border border-neutral w-full cursor-pointer hover:border-base-200 hover:shadow-lg transition-all ease-in-out duration-200`}>{selectedCurrency}</p>
                        {!currencySelectOpen ? <GoChevronRight onClick={() => setCurrencySelectOpen(!currencySelectOpen)} size={22} className={`absolute cursor-pointer inset transition-all ease-in-out duration-150 bottom-2.5 end-2.5`} /> : <GoChevronRight onClick={() => setCurrencySelectOpen(!currencySelectOpen)} size={22} className={`absolute cursor-pointer rotate-90 transition-all ease-in-out duration-150 inset bottom-2.5 end-2.5`} />}
                        <AnimatePresence>
                            {currencySelectOpen && (
                                <motion.div key={currencySelectOpen} initial={{ opacity: 0, y: 20, visibility: "hidden" }} animate={{ opacity: 1, y: 0, visibility: "visible" }} exit={{ opacity: 0, y: -20, visibility: "hidden" }} transition={{ type: "spring", duration: 0.6 }} className={`w-full absolute mt-3 shadow-xl rounded-md border border-neutral bg-base-300 bg-opacity-100`}>
                                    {currencyData.filter(currency => currency.name !== selectedCurrency).map((option, index) => {
                                        return (
                                            <div onClick={() => {setSelectedCurrency(option.name); setCurrencySelectOpen(false);}} key={index} className={`flex items-center gap-2 py-2 px-2.5 hover:bg-neutral hover:bg-opacity-40 transition-all duration-200 ease-in-out cursor-pointer`}>
                                                <img src={option.image} alt={option.name} className={`w-5 aspect-square rounded-full`} />
                                                <p className={`text-base-content`}>{option.name}</p>
                                            </div>
                                        )
                                    })}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }} className={`2xl:w-2/3 2xl:mx-auto`}>
                        <p className={`text-xl font-bold text-white ${userData.notifications === true ? `mb-3` : `mb-10`} flex items-center gap-3`}>Notification Settings<input checked={userData.notifications === true} type='checkbox' onClick={() => toggleCategory('notifications')} className={`toggle toggle-success toggle-sm`} /></p>
                        {userData.notifications === true && (<div className={`mb-10`}>
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Trades<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'trades').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Market<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'market').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Portfolio<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'portfolio').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5 w-11/12`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Watchlist<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'watchlist').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5 w-11/12`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Account<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'account').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5 w-11/12`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Promotions<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'promotions').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5 w-11/12`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                            <p className={`font-medium text-base-content text-xl mb-2.5 flex items-center gap-2 w-full`}><div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div>Educational<div className={`h-px rounded-full bg-base-content w-full mt-0.5`}></div></p>
                            {notificationSettings.filter(val => val.category === 'educational').map((setting, index) => {
                                return (
                                    <div key={index} className={`flex items-center justify-between w-full`}>
                                        <div>
                                            <p className={`font-medium text-white`}>{setting.title}</p>
                                            <p className={`font-normal text-base-content mb-2.5 w-11/12`}>{setting.description}</p>
                                        </div>
                                        <input onClick={() => toggleCategory(setting.name)} checked={userData[setting.name]} type='checkbox' className={`toggle toggle-success toggle-sm`}/>
                                    </div>
                                )
                            })}
                        </div>)}
                        <p className={`text-xl font-bold text-white mb-10 flex items-center gap-3`}>Privacy Settings<input type='checkbox' className={`toggle toggle-success toggle-sm`} /></p>
                        <p className={`text-xl font-bold text-white mb-10 flex items-center gap-3`}>Security Settings<input type='checkbox' className={`toggle toggle-success toggle-sm`} /></p>
                        <p className={`text-xl font-bold text-white mb-3`}>Theme</p>
                    </motion.div>
                </motion.div>
            ) : (
                <div className={`w-full`}><TbLoader2 className={`mx-auto animate-spin text-white`} size={30} /></div>
            )}
        </div>
    )
}