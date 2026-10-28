
const readline = require('readline-sync');

let subscriptions = [
  {
    subscriptionId: 'SUB_001',
    customerName: 'Nguyen Van An',
    planTier: 'PERSONAL',
    deviceLimit: 1,
    status: 'ACTIVE'
  },
  {
    subscriptionId: 'SUB_002',
    customerName: 'Tran Thi Mai',
    planTier: 'FAMILY',
    deviceLimit: 5,
    status: 'ACTIVE'
  },
  {
    subscriptionId: 'SUB_003',
    customerName: 'Le Van Nam',
    planTier: 'PERSONAL',
    deviceLimit: 1,
    status: 'ACTIVE'
  }
];

function addSubscription() {
  console.log('\n--- THEM THUE BAO MOI ---');

  const customerName = readline.question('Nhap ten khach hang: ');

  if (customerName.trim() === '') {
    console.log('Ten khach hang khong duoc de trong!');
    return;
  }

  console.log('Chon goi cuoc:');
  console.log('1. PERSONAL - 1 thiet bi');
  console.log('2. FAMILY - 5 thiet bi');

  const planChoice = readline.question('Nhap lua chon: ');

  let planTier;
  let deviceLimit;

  if (planChoice === '1') {
    planTier = 'PERSONAL';
    deviceLimit = 1;
  } else if (planChoice === '2') {
    planTier = 'FAMILY';
    deviceLimit = 5;
  } else {
    console.log('Lua chon goi cuoc khong hop le!');
    return;
  }

  const subscriptionId = 'SUB_' + String(Date.now()).slice(-6);

  const newSubscription = {
    subscriptionId: subscriptionId,
    customerName: customerName.trim(),
    planTier: planTier,
    deviceLimit: deviceLimit,
    status: 'ACTIVE'
  };

  subscriptions.push(newSubscription);

  console.log('Them thue bao thanh cong!');
  console.log('Ma thue bao: ' + subscriptionId);
}

function listSubscriptions() {
  console.log('\n--- DANH SACH THUE BAO ---');

  if (subscriptions.length === 0) {
    console.log('Chua co thue bao nao!');
    return;
  }

  console.table(subscriptions);
}

function updateSubscription() {
  console.log('\n--- CAP NHAT GOI CUOC ---');

  const subscriptionId = readline.question('Nhap ma thue bao: ');
  let found = false;

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      found = true;

      if (subscriptions[i].status === 'CANCELLED') {
        console.log('Thue bao da huy, khong the cap nhat!');
        return;
      }

      console.log('1. PERSONAL - 1 thiet bi');
      console.log('2. FAMILY - 5 thiet bi');

      const planChoice = readline.question('Chon goi cuoc moi: ');

      if (planChoice === '1') {
        subscriptions[i].planTier = 'PERSONAL';
        subscriptions[i].deviceLimit = 1;
      } else if (planChoice === '2') {
        subscriptions[i].planTier = 'FAMILY';
        subscriptions[i].deviceLimit = 5;
      } else {
        console.log('Lua chon khong hop le!');
        return;
      }

      console.log('Cap nhat goi cuoc thanh cong!');
      return;
    }
  }

  if (!found) {
    console.log('Khong tim thay ma thue bao!');
  }
}

function deleteSubscription() {
  console.log('\n--- HUY THUE BAO ---');

  const subscriptionId = readline.question('Nhap ma thue bao can huy: ');

  for (let i = 0; i < subscriptions.length; i++) {
    if (subscriptions[i].subscriptionId === subscriptionId) {
      subscriptions.splice(i, 1);
      console.log('Huy va xoa thue bao thanh cong!');
      return;
    }
  }

  console.log('Khong tim thay ma thue bao!');
}

function main() {
  let menuChoice;

  do {
    console.log('\n========== RIKKEISTREAM ==========');
    console.log('1. Them thue bao moi');
    console.log('2. Xem danh sach thue bao');
    console.log('3. Cap nhat goi cuoc');
    console.log('4. Huy thue bao');
    console.log('5. Thoat chuong trinh');
    console.log('==================================');

    menuChoice = readline.question('Nhap lua chon cua ban: ');

    switch (menuChoice) {
      case '1':
        addSubscription();
        break;

      case '2':
        listSubscriptions();
        break;

      case '3':
        updateSubscription();
        break;

      case '4':
        deleteSubscription();
        break;

      case '5':
        console.log('Cam on ban da su dung RikkeiStream!');
        break;

      default:
        console.log('Lua chon khong hop le! Vui long chon tu 1 den 5.');
    }
  } while (menuChoice !== '5');
}

main();
