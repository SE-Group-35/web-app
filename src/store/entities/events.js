import { createSelector } from "reselect";
import {
  uploadBytes,
  getDownloadURL,
  deleteObject,
  ref,
  refFromURL,
} from "@firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { database, storage } from "../../firebase";
import { toTimestamp } from "../../utils/toTimestamp";
import randomid from "randomid";
import { processRequested, processCompleted, processFailed } from "../system";
export const addEvent = (
  file,
  title,
  description,
  published,
  startDate,
  endDate,
  venue,
  overview
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const id = randomid(12);

      const storageRef = ref(storage, `/images/events/${id}/${file.name}`);
      //const firestore = getFirestore();
      //const firebase = getFirebase();
      dispatch(processRequested());
      await uploadBytes(storageRef, file)
        .then(async (snapshot) => {
          await getDownloadURL(storageRef).then(async (url) => {
            await database
              .collection("events")
              .doc(id)
              .set({
                title: title,
                description: description,

                url: url,
                overview: overview,

                //date: date,
                published: published,
                date: {
                  from: toTimestamp(startDate),
                  to: toTimestamp(endDate),
                },
                venue: venue,
              });
          });
        })

        .then(() => {
          console.log("Succesfully added");
          dispatch(processCompleted());
        });
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const editEvent = (
  id,
  file,
  title,
  description,
  published,
  startDate,
  endDate,
  venue,
  Uri,
  overview
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      if (file === "") {
        dispatch(processRequested());
        await database
          .collection("events")
          .doc(id)
          .update({
            title: title,
            description: description,

            url: Uri,
            overview: overview,

            published: published,
            date: {
              from: toTimestamp(startDate),
              to: toTimestamp(endDate),
            },
            venue: venue,
          })
          .then(() => {
            console.log("Succesfully updated without editing image");
            dispatch(processCompleted());
          });
      } else {
        dispatch(processRequested());
        const storageRef = ref(storage, `/images/events/${id}/${file.name}`);
        //const firestore = getFirestore();
        //const firebase = getFirebase();
        await uploadBytes(storageRef, file)
          .then((snapshot) => {
            getDownloadURL(storageRef).then(async (url) => {
              await database
                .collection("events")
                .doc(id)
                .update({
                  title: title,
                  description: description,

                  url: url,

                  published: published,
                  date: {
                    from: toTimestamp(startDate),
                    to: toTimestamp(endDate),
                  },
                  venue: venue,
                });
            });
          })

          .then(() => {
            console.log("Succesfully Updated with editing image");
            dispatch(processCompleted());
          });
      }
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const deleteEvent = (id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      const eventRef = ref(storage, `images/events/${id}/`);

      // const firestore = getFirestore();
      //const firebase = getFirebase();

      //Need to implement deletion in storage also

      await deleteDoc(doc(database, "events", id));
      console.log("Done deleted");
      dispatch(processCompleted());

      //2.
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const togglePublished = (id, published) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      const firestore = getFirestore();
      const firebase = getFirebase();
      return await firestore.collection("events").doc(id).update({
        published: published,
      });

      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};
