import { storage } from "../../firebase";
import { uploadBytes, getDownloadURL, ref } from "@firebase/storage";
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../firebase";
import randomid from "randomid";
import { processRequested, processCompleted, processFailed } from "../system";



export const addDestination = (
  title,
  description,
  address,
  overview,
  inputFields,
  selected,
  coords,
  imageList,
  switchState
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const database = getFirestore();
      const urlList = [];
      const activityList = [];
      inputFields.forEach((activity) => {
        activityList.push(activity.activityName);
      });
      dispatch(processRequested());
      const id = randomid(12);

      for (const image of imageList) {
        const storageRef = ref(
          storage,
          `/images/destinations/${id}/${image.fileName}`
        );
        const uploadTask = uploadBytes(storageRef, image.file);
        await uploadTask.then((snapshot) => {
          getDownloadURL(storageRef).then((url) => {
            urlList.push(url);
          });
        });
      }

      await database
        .collection("destinations")
        .doc(id)
        .set({
          title: title,
          description: description,
          overview: overview,

          coords: [coords.lat.toString(), coords.lng.toString()],
          address: address,
          tags: activityList,
          categories: selected,
          published: switchState,
          mainPhoto: urlList.at(0),
        })
        .then(() => {
          inputFields.forEach(async (activity) => {
            await database
              .collection("destinations")
              .doc(id)
              .collection("activities")
              .doc(activity.id)
              .set({
                description: activity.activityDescription,
                name: activity.activityName,
              });
          });
        })
        .then(async () => {
          await database
            .collection("destinations")
            .doc(id)
            .collection("gallery")
            .doc("images")
            .set({ urls: urlList });
        });

      console.log("Added Destination");

      dispatch(processCompleted());
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const editDestination = (
  id,
  title,
  description,
  overview,
  selected,
  address,
  coords,
  switchState
) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());
      await database
        .collection("destinations")
        .doc(id)
        .update({
          title: title,
          description: description,
          overview: overview,
          categories: selected,
          address: address,
          coords: [coords.lat.toString(), coords.lng.toString()],
          published: switchState,
        })
        .then(() => {
          console.log("Succesfully updated destination without editing image");
          dispatch(processCompleted());
        });
    } catch (error) {
      dispatch(processFailed());
    }
  };
};

export const deleteDestination = (id) => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      dispatch(processRequested());

      //const destinationRef = ref(storage, `images/detinations/${id}`);

      await deleteDoc(doc(database, "destinations", id));
      console.log("Done deleted destination");
      dispatch(processCompleted());

      // const firestore = getFirestore();
      //const firebase = getFirebase();

      //Need to implement deletion in storage also

      //2.
    } catch (error) {
      dispatch(processFailed());
    }
  };
};


