const getStudentData = async () => {
    const studentData = '/studentdata.csv';
    try {
        const response = await fetch(studentData);
        console.log("The data in getData function ", data);
        return await response.text();
    }
    catch (error) {
        console.log('Oops something went wrong:', error);
    }
};

export default getStudentData;
