import mongoose from "mongoose";

export async function pagingService(
  dataInput: any,
  page: number,
  pageSize: number,
) {
  let skipDocument: number = (Number(page) - 1) * Number(pageSize);
  try {
    let data = await dataInput.skip(skipDocument).limit(pageSize);
    let numberOfDocuments = await dataInput.count();
    let lastPage = Math.ceil(numberOfDocuments / pageSize);
    let nextPage = page + 1 > lastPage ? null : page + 1;
    let prevPage = page - 1 < 1 ? page : page - 1;

    let result = {
      data: [...data],
      numberOfDocuments: numberOfDocuments,
      lastPage: lastPage,
      nextPage: nextPage,
      prevPage: prevPage,
      currentPage: page,
    };

    return Promise.resolve(result);
  } catch (error) {
    return Promise.reject(error);
  }
}
