using SE_HW1;

namespace SE_HW1_Test
{
    [TestClass]
    public class UnitTest1
    {
        [TestMethod]
        public void testIsEmpty_true()
        {
            BozoLL ll = new BozoLL();
            Assert.IsTrue(ll.IsEmpty());
        }

        [TestMethod]
        public void testIsEmpty_false()
        {
            BozoLL ll = new BozoLL();
            ll.AddToTail(2);

            Assert.IsFalse(ll.IsEmpty());
        }

        [TestMethod]
        public void testLength_sizeN()
        {
            BozoLL ll = new BozoLL();
            int expectedLength = 3;

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            Assert.AreEqual(expectedLength, ll.Length());
        }

        [TestMethod]
        public void testLength_size0()
        {
            BozoLL ll = new BozoLL();
            int expectedLength = 0;

            Assert.AreEqual(expectedLength, ll.Length());
        }

        [TestMethod]
        public void testLength_afterDel()
        {
            BozoLL ll = new BozoLL();
            int expectedLength = 2;

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            ll.DeleteNode(2);

            Assert.AreEqual(expectedLength, ll.Length());
        }

        [TestMethod]
        public void testAddToHead()
        {
            BozoLL ll = new BozoLL();
            int expectedVal = 1;

            ll.AddToHead(1);

            Assert.AreEqual(expectedVal, ll.GetNode(0));
        }

        [TestMethod]
        public void testAddToTail()
        {
            BozoLL ll = new BozoLL();
            int expectedVal = 3;

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            int llLen = ll.Length();
            int tailVal = ll.GetNode(llLen - 1);

            Assert.AreEqual(expectedVal, tailVal);
        }

        [TestMethod]
        public void testFind_oneVal()
        {
            BozoLL ll = new BozoLL();
            int expectedIndex = 1;

            ll.AddToTail(1);
            ll.AddToTail(2);

            Assert.AreEqual(expectedIndex, ll.Find(2));
        }

        [TestMethod]
        public void testFind_multipleVal()
        {
            BozoLL ll = new BozoLL();
            int expectedIndex = 2;

            ll.AddToTail(7);
            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(2);

            Assert.AreEqual(expectedIndex, ll.Find(2));
        }

        [TestMethod]
        public void testGetNode_exists()
        {
            BozoLL ll = new BozoLL();
            int expectedVal = 43;

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            ll.AddToTail(43);

            int val = ll.GetNode(3);

            Assert.AreEqual(expectedVal, val);
        }

        [TestMethod]
        public void testGetNode_EmptyList()
        {
            BozoLL ll = new BozoLL();
            int expectedVal = -1;

            int val = ll.GetNode(9999);

            Assert.AreEqual(expectedVal, val);
        }

        [TestMethod]
        public void testGetNode_DNE()
        {
            BozoLL ll = new BozoLL();
            int expectedVal = -1;

            ll.AddToTail(1);
            ll.AddToTail(2);

            int val = ll.GetNode(9999);

            Assert.AreEqual(expectedVal, val);
        }

        [TestMethod]
        public void testDisplayNode_notNull()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "1";

            ll.AddToTail(1);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayNode(0);
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDisplayNode_null()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "-1";

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayNode(0);
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDisplayList_notEmpty()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "1,2,3";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDisplayList_empty()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "Empty List!";

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDeleteNode_head()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "2,3";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            bool del = ll.DeleteNode(0);

            Assert.IsTrue(del);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDeleteNode_middle()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "1,3";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            bool del = ll.DeleteNode(1);

            Assert.IsTrue(del);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod] 
        public void testDeleteNode_tail()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "1,2";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            bool del = ll.DeleteNode(2);

            Assert.IsTrue(del);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testDeleteNode_indexOutOfRange()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "1,2,3";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            bool delLow = ll.DeleteNode(-1);
            bool delHigh = ll.DeleteNode(999);

            Assert.IsFalse(delLow);
            Assert.IsFalse(delHigh);

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testRemoveNode_emptyList()
        {
            BozoLL ll = new BozoLL();
            bool del = ll.DeleteNode(0);

            Assert.IsFalse(del);
        }

        [TestMethod]
        public void testDeleteList()
        {
            BozoLL ll = new BozoLL();
            String expectedVal = "Empty List!";

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            ll.DeleteList();

            using (StringWriter sw = new StringWriter())
            {
                Console.SetOut(sw);
                ll.DisplayList();
                String val = sw.ToString();

                Assert.AreEqual(expectedVal, val);
            }
        }

        [TestMethod]
        public void testSortList_unsorted() 
        {
            BozoLL ll = new BozoLL();
            BozoLL expectedll = new BozoLL();

            ll.AddToTail(3);
            ll.AddToTail(1);
            ll.AddToTail(4);
            ll.AddToTail(2);

            ll.SortList();

            expectedll.AddToTail(1);
            expectedll.AddToTail(2);
            expectedll.AddToTail(3);
            expectedll.AddToTail(4);

            Assert.IsTrue(ll.IsEqual(expectedll));

        }

        [TestMethod]
        public void testSortList_sorted() 
        {
            BozoLL ll = new BozoLL();
            BozoLL expectedll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);
            ll.AddToTail(4);

            ll.SortList();

            expectedll.AddToTail(1);
            expectedll.AddToTail(2);
            expectedll.AddToTail(3);
            expectedll.AddToTail(4);

            Assert.IsTrue(ll.IsEqual(expectedll));
            
        }

        [TestMethod]
        public void testSortList_empty()
        {
            BozoLL ll = new BozoLL();
            BozoLL expectedll = new BozoLL();

            ll.SortList();

            Assert.IsTrue(ll.IsEqual(expectedll));
        }

        [TestMethod]
        public void testEditNode_Change()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            ll.EditNode(1, 20);

            Assert.AreEqual(20, ll.GetNode(1));
        }

        [TestMethod]
        public void testEditNode_NoChange()
        {

            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            int originalValue = ll.GetNode(2);

            ll.EditNode(3, 20);

            Assert.AreEqual(originalValue, ll.GetNode(2));
            Assert.AreEqual(-1, ll.GetNode(3));
        }

        [TestMethod]
        public void testEditNode_Empty()
        {
            BozoLL ll = new BozoLL();

            ll.EditNode(0, 20);

            Assert.IsTrue(ll.IsEmpty());
        }

        public void testCopyNode_ToHead()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            ll.CopyNode(1, 0);

            Assert.AreEqual(2, ll.GetNode(0));
            Assert.AreEqual(4, ll.Length());
        }

        [TestMethod]
        public void testCopyNode_ToTail()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            ll.CopyNode(0, 3);

            Assert.AreEqual(1, ll.GetNode(3));
            Assert.AreEqual(4, ll.Length());
        }

        [TestMethod]
        public void testCopyNode_ToMiddle()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            ll.CopyNode(2, 1);

            Assert.AreEqual(3, ll.GetNode(1));
            Assert.AreEqual(4, ll.Length());
        }

        [TestMethod]
        public void testCopyNode_OutOfRangeSource()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            int originalLength = ll.Length();

            ll.CopyNode(4, 1);

            Assert.AreEqual(originalLength, ll.Length());
        }

        [TestMethod]
        public void testCopyNode_OutOfRangeDestination()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(1);
            ll.AddToTail(2);
            ll.AddToTail(3);

            int originalLength = ll.Length();

            ll.CopyNode(1, 4);

            Assert.AreEqual(originalLength, ll.Length());
        }

        [TestMethod]
        public void testBiSearch_Nonempty()
        {
            BozoLL ll = new BozoLL();
        }

        [TestMethod]
        public void testBiSearch_Empty()
        {
            BozoLL ll = new BozoLL();
        }

        [TestMethod]
        public void testCreateList_CreatesCorrectList()
        {
            BozoLL ll = new BozoLL();

            int start = 1, end = 5;
            int expectedLength = end - start + 1;

            ll.CreateList(start, end);

            Assert.AreEqual(expectedLength, ll.Length());

            for (int i = start; i <= end; i++)
            {
                Assert.AreEqual(i, ll.GetNode(i - start));
            }
        }

        [TestMethod]
        public void CreateList_OnExistingList_ClearsAndCreatesNewList()
        {
            BozoLL ll = new BozoLL();

            ll.AddToTail(10);
            ll.AddToTail(11);

            int start = 1, end = 3;
            int expectedLength = end - start + 1;

            ll.CreateList(start, end);

            Assert.AreEqual(expectedLength, ll.Length());

            for (int i = start; i <= end; i++)
            {
                Assert.AreEqual(i, ll.GetNode(i - start));
            }
        }
    }
}