exports.paginate = function(data, settings) {
    var page = settings.page || 1,
        numberPerPage = settings.recordsPerPage || 20,
        sort = settings.sort || undefined,
        desc = settings.desc || true;

    // Sort data
    if (sort) {
        data = order(data, { func: sort, desc: desc });
    }

    page = Number(page);
    var length = numberPerPage;
    var index = page - 1;
    var offset = index * length;
    var amount = offset + length;

    var totalPages = Math.ceil(data.length / length);
    var object = {
        records: data.slice(offset, amount),
        hasNext: page < totalPages,
        hasLast: page > 1,
        nextPage: page + 1,
        lastPage: page - 1,
    };
    return object;
};

function order(data, options) {
    var sorted;
    sorted = data.sort(options.func);
    if (options.desc) {
        return sorted.reverse();
    } else {
        return sorted;
    }
}

/*
    var data = pager.paginate({data}d(), {
        page: {pageNo},
        recordsPerPage: 4,
        sort: (a, b) => {
            a._id - b._id;
        },
    });
*/
