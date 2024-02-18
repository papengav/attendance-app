using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SE_HW1
{
    public class Node
    {
        internal int data;
        internal Node next;
        public Node(int data)
        {
            this.data = data;
            next = null;
        }
    }

    public class BozoLL
    {
        Node head;
        int len;

        public BozoLL()
        {
            head = null;
        }

        public bool IsEmpty()
        {
            return head == null;
        }

        public void AddToHead(int val)
        {
            Node node = new Node(val);
            Node temp = head;
            head = node;
            head.next = temp;

            len++;
        }

        public void AddToTail(int val)
        {
            Node node = new Node(val);

            if (IsEmpty())
            {
                head = node;
            }
            else
            {
                Node temp = head;
                while (temp.next != null)
                {
                    temp = temp.next;
                }
                temp.next = node;
            }

            len++;
        }

        public int Length()
        {
            return len;
        }

        public int GetNode(int index)
        {
            if (IsEmpty())
            {
                return -1;
            }

            Node temp = head;
            int i = 0;
            
            while (temp.next != null && i < index)
            {
                temp = temp.next;
                i++;
            }

            return (i == index) ? temp.data : -1;
        }

        public int Find(int val)
        {
            if (IsEmpty())
            {
                return -1;
            }

            Node temp = head;
            int i = 0;

            while (temp.next != null && temp.next.data != val)
            {
                temp = temp.next;
                i++;
            }

            if (temp == null)
            {
                return -1;
            }

            return i+1;
        }

        public void DisplayNode(int index)
        {
            Console.Write(GetNode(index));
        }

        public void DisplayList()
        {
            if (IsEmpty())
            {
                Console.Write("Empty List!");
            }
            else
            {
                string list = "";
                Node temp = head;

                while (temp != null)
                {
                    list += temp.data + ",";
                    temp = temp.next;
                }

                Console.Write(list.Remove(list.Length - 1, 1));
            }
        }

        public bool DeleteNode(int index)
        {
            if (IsEmpty() || index < 0 || index > len - 1)
            {
                return false;
            }

            else if (index == 0)
            {
                head = head.next;
                len--;
                return true;
            }
            else
            {
                Node temp = head.next;
                Node prev = head;

                for (int i = 1; i < index; i++)
                {
                    prev = temp;
                    temp = temp.next;
                }

                prev.next = temp.next;
                len--;
                return true;
            }
        }

        public void DeleteList()
        {
            head = null;
        }

        public void SortList() 
        {
            if (IsEmpty() || head.next == null) return;

            Node current = head;

            while (current != null) 
            {
                Node min = current;
                Node temp = current.next;

                while (temp != null) 
                {
                    if (temp.data < min.data) 
                    {
                        min = temp;
                    }
                    temp = temp.next;
                }

                int tempData = current.data;
                current.data = min.data;
                min.data = tempData;

                current = current.next;
            }
        }

        public void EditNode(int index, int newValue) 
        {
            if (index < 0 || index >= len) return;

            Node current = head;

            for (int i = 0; i < index; i++) 
            {
                current = current.next;
            }

            current.data = newValue;
        }

        public void CopyNode(int index1, int index2)
        {
            if (index1 < 0 || index1 >= len || index2 < 0 || index2 > len) return;

            Node nodeToCopy = head;
            for (int i = 0; i < index1 && nodeToCopy != null; i++)
            {
                nodeToCopy = nodeToCopy.next;
            }

            if (nodeToCopy == null) return;

            if (index2 == 0)
            {
                Node newNode = new Node(nodeToCopy.data);
                newNode.next = head;
                head = newNode;
                len++;
                return;
            }

            if (index2 == len)
            {
                AddToTail(nodeToCopy.data);
                return;
            }

            Node prevNode = null;
            Node currentNode = head;
            for (int i = 0; i < index2; i++)
            {
                prevNode = currentNode;
                currentNode = currentNode.next;
            }

            if (prevNode != null)
            {
                Node newNode = new Node(nodeToCopy.data);
                prevNode.next = newNode;
                newNode.next = currentNode;
                if (index2 < len)
                {
                    len++;
                }
            }
        }

        public void BiSearch(BozoLL ll, int val)
        {

        }

        // Not sure about this, wanted different functionality from the constructor
        public void CreateList(int[] array, BozoLL ll)
        {
            ll.head = null;
            ll.len = 0;

            for (int index = 0; index < array.Length; index++)
            {
                ll.AddToTail(array[index]);
                ll.len++;
            }
        }

        public bool IsEqual(BozoLL otherList)
        {
            Node currentThis = this.head;
            Node currentOther = otherList.head;

            while (currentThis != null && currentOther != null)
            {
                if (currentThis.data != currentOther.data)
                {
                    return false;
                }
                currentThis = currentThis.next;
                currentOther = currentOther.next;
            }

            return currentThis == null && currentOther == null;
        }
    }
}