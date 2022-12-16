import {child, get, onValue, ref, set} from "firebase/database";
import {
    setClubId,
    setClubOwnerId,
    setGenres,
    setLanguage,
    setMaxMembers,
    setMeetings,
    setMeetingType, setMembers, setReadingList, setVoteDeadline, setVotes
} from "../../slices/clubSlice";
import {setParentData, setChildData} from "../../../Utils/persistenceUtil";
import {setClubIds, setDisplayName, setGender, setLanguages, setUserId} from "../../slices/userSlice";
import {setLatestCreatedClubId} from "../../slices/clubCreationSlice";

const getRefs = (firebaseDb, state) => {
    const clubPath = `clubs/${state.club.clubId}/`;
    const clubRef = ref(firebaseDb, clubPath);

    const createdClubPath = `clubs/${state.clubCreation.latestCreatedClubId}`;
    const createdClubRef = ref(firebaseDb, createdClubPath);

    const clubMetaDataPath = "clubMetaData/";
    const clubMetaDataRef = ref(firebaseDb, clubMetaDataPath);
    const clubNamesRef = ref(firebaseDb, clubMetaDataPath + "/clubNames");

    return {
        clubRef,
        createdClubRef,
        clubMetaDataRef,
        clubNamesRef
    }
}

const toFirebase = (firebaseDb, state, prevState) => {
    const {
        clubRef,
        createdClubRef,
        clubMetaDataRef,
        clubNamesRef } = getRefs(firebaseDb, state);

    const club = state.club;
    const prevClub = prevState.club;

    const createdClub = state.clubCreation.clubToBeCreated;
    const prevCreatedClub = prevState.clubCreation.clubToBeCreated;

    const latestCreatedClubId = state.clubCreation.latestCreatedClubId;
    let clubName = state.clubCreation.clubToBeCreated.clubName;

    if( createdClub !== prevCreatedClub ) {
        setParentData(createdClub, createdClubRef);
        setChildData({latestCreatedClubId}, clubMetaDataRef);
        setChildData(clubName, clubNamesRef);
    }

    const clubId = club.clubId;
    if (clubId !== prevClub.clubId) {
        setChildData({clubId}, clubRef);
    }

    clubName = club.clubName;
    if(clubName !== prevClub.clubName) {
        setChildData({clubName}, clubRef);
    }

    const clubOwnerId = club.clubOwnerId;
    if (clubOwnerId !== prevClub.clubOwnerId) {
        setChildData({clubOwnerId}, clubRef);
    }

    const currentlyReadingId = club.currentlyReadingId;
    if (currentlyReadingId !== prevClub.currentlyReadingId) {
        setChildData({currentlyReadingId}, clubRef)
    }

    const genres = club.genres;
    if (genres !== prevClub.genres /*&& !arrayEquals(genres, prevClub.genres*/) {
        setChildData({genres}, clubRef);
    }

    const language = club.language;
    if (language !== prevClub.language) {
        setChildData({language}, clubRef);
    }

    const maxMemberCount = club.maxMemberCount;
    if (maxMemberCount !== prevClub.maxMemberCount) {
        setChildData({maxMemberCount}, clubRef);
    }

    const meetings = club.meetings;
    if (meetings !== prevClub.meetings) {
        setChildData({meetings}, clubRef);
    }

    const meetingType = club.meetingType;
    if (meetingType !== prevClub.meetingType) {
        setChildData({meetingType}, clubRef);
    }

    const memberIds = club.memberIds;
    if (memberIds !== prevClub.memberIds /*&& !arrayEquals(memberIds, prevClub.memberIds*/) {
        setChildData({memberIds}, clubRef);
    }

    const readingList = club.readingList;
    if (readingList !== prevClub.readingList) {
        setChildData({readingList}, clubRef)
    }

    const voteDeadline = club.voteDeadline;
    if (voteDeadline !== prevClub.voteDeadline) {
        setChildData({voteDeadline}, clubRef);
    }

    const votes = club.votes;
    if (votes !== prevClub.votes) {
        setChildData({votes}, clubRef);
    }
};

const fromFirebase = (dispatch, clubData, createdClubData) => {
    if (createdClubData?.latestCreatedClubId) dispatch(setLatestCreatedClubId(createdClubData.latestCreatedClubId));
    if (clubData?.clubId) dispatch(setClubId(clubData.clubId));
    if (clubData?.clubOwnerId) dispatch(setClubOwnerId(clubData.clubOwnerId));
    if (clubData?.genres) dispatch(setGenres(clubData.genres));
    if (clubData?.language) dispatch(setLanguage(clubData.language));
    if (clubData?.maxMemberCount) dispatch(setMaxMembers(clubData.maxMemberCount));
    if (clubData?.meetings) dispatch(setMeetings(clubData.meetings));
    if (clubData?.meetingType) dispatch(setMeetingType(clubData.meetings));
    if (clubData?.memberIds) dispatch(setMembers(clubData.memberIds));
    if (clubData?.readingList) dispatch(setReadingList(clubData.readingList));
    if (clubData?.voteDeadline) dispatch(setVoteDeadline(clubData.voteDeadline));
    if (clubData?.votes) dispatch(setVotes(clubData.votes));
}

const fromFirebaseOnce = async (firebaseDb, state, dispatch) => {
    const { clubRef, createdClubRef } = getRefs(firebaseDb, state);

    const clubSnapshot = await get(clubRef);
    const clubData = clubSnapshot.val();
    const createdClubSnapshot = await get(createdClubRef);
    const createdClubData = createdClubSnapshot.val();

    fromFirebase(dispatch, clubData, createdClubData);
}

const fromFirebaseSub = (firebaseDb, state, dispatch) => {
    const { clubRef, createdClubRef } = getRefs(firebaseDb, state);

    const clubUnsub = onValue(clubRef, snapshot => {
        const clubData = snapshot.val();

        fromFirebase(dispatch, clubData);
    })

    const createdClubUnsub = onValue(createdClubRef, snapshot => {
        const createdClubData = snapshot.val();

        if (createdClubData?.latestCreatedClubId)
            dispatch(setLatestCreatedClubId(createdClubData.latestCreatedClubId));
    })

    return [clubUnsub, createdClubUnsub]
}

const persistClubs = {
    toFirebase,
    fromFirebaseOnce,
    fromFirebaseSub
}

export default persistClubs