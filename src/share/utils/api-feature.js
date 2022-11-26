module.exports.pagination = (data) => {
    const totalPages = Math.ceil(data.count/data.perPage);
    const totalPerPage = data.per_page;
    const currentPage = data.page;
    const previus = currentPage == 1 ? null: currentPage-1;
    const next = currentPage == totalPages ? null : currentPage +1;

    console.log('Total pages', data.count/data.perPage)
    const allData = {
        data: data.data,
        pagination: {
            total: data.count,
            totalPerPage: totalPerPage,
            totalPages,
            currentPage,
            previus,
            next
        }
    }
    return allData;
}