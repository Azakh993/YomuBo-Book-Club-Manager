import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    clubs : [],

    clubId : 1,
    clubOwnerId : "irsPW5zlE4SPq5KwvnT3Snq10w63",
    clubName : "KTH deckarklubb",
    currentlyReadingId : null,
    genres : [ "Western", "Mystery" ],
    language : "Korean",
    maxMemberCount : 3,
    meetings : [],
    meetingType : "Physical",
    memberIds : [ "irsPW5zlE4SPq5KwvnT3Snq10w63",
        "cdWAiHj65ya8M5JdTQJguZYouZU2" ],
    readingList : [],
    voteDeadline : null,
    votes : [],
}

export const club = createSlice( {
    name : 'club',
    initialState,
    reducers : {
        addBookToReadingList : ( state, { payload } ) => {
            return {
                ...state,
                readingList : [ ...state.readingList, payload ],
            }
        },
        addGenre : ( state, { payload } ) => {
            return {
                ...state,
                genres : [ ...state.genres, payload ],
            }
        },
        addMember : ( state, { payload } ) => {
            return {
                ...state,
                members : [ ...state.members, payload ],
            }
        },
        setClubId : ( state, { payload } ) => {
            state.clubId = payload;
        },
        setClubName : ( state, { payload } ) => {
            state.clubName = payload;
        },
        setClubOwnerId : ( state, { payload } ) => {
            state.clubOwnerId = payload;
        },
        setCurrentlyReadingId : ( state, { payload } ) => {
            state.currentlyReadingId = payload;
        },
        setGenres : ( state, { payload } ) => {
            return {
                ...state,
                genres : [ ...payload ]
            }
        },
        setLanguage : ( state, { payload } ) => {
            state.language = payload;
        },
        setMaxMembers : ( state, { payload } ) => {
            state.maxMemberCount = payload;
        },
        setMembers : ( state, { payload } ) => {
            return {
                ...state,
                memberIds : [ ...payload ]
            }
        },
        setMeetings : ( state, { payload } ) => {
            return {
                ...state,
                meetings : [ ...payload ]
            }
        },
        setMeetingType : ( state, { payload } ) => {
            state.meetingType = payload;
        },
        setReadingList : ( state, { payload } ) => {
            return {
                ...state,
                readingList : [ ...payload ]
            }
        },
        setVotes : ( state, { payload } ) => {
            return {
                ...state,
                votes : [ ...payload ]
            }
        },
        setVoteDeadline : ( state, { payload } ) => {
            state.voteDeadline = payload;
        },
        removeBookFromReadingList : ( state, { payload } ) => {
            return {
                ...state,
                readingList : state.readingList.filter(
                    book => book.id !== payload ),
            }
        },
        removeGenre : ( state, { payload } ) => {
            return {
                ...state,
                genres : state.genres.filter( genre => genre !== payload ),
            }
        },
        removeMember : ( state, { payload } ) => {
            return {
                ...state,
                members : state.members.filter(
                    member => member.id !== payload ),
            }
        },
    }
} );

export const {
    addBookToReadingList,
    addGenre,
    addMember,
    setClubId,
    setClubName,
    setClubOwnerId,
    setCurrentlyReadingId,
    setGenres,
    setLanguage,
    setMeetings,
    setMaxMembers,
    setMembers,
    setMeetingType,
    setReadingList,
    setVoteDeadline,
    setVotes,
    removeBookFromReadingList,
    removeGenre,
    removeMember
} = club.actions;

export const selectClub = state => state.club;

export const selectClubId = state => state.club.id;

export const selectClubName = state => state.club.clubName;

export const selectLanguage = state => state.club.language;

export const selectMaxMembers = state => state.club.maxMemberCount;

export const selectMeetingType = state => state.club.meetingType;

export const selectMembers = state => state.club.members;

export const selectReadingList = state => state.club.readingList;